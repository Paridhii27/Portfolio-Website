#!/usr/bin/env python3
"""
Migrate public/project-pages/*.html to match layout.html shell (layout.css).
Does not modify layout.html.
"""

from __future__ import annotations

import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "public" / "project-pages"
LAYOUT = PAGES / "layout.html"

sys.path.insert(0, str(ROOT / ".venv_bs4"))
from bs4 import BeautifulSoup  # noqa: E402


def read_soup(path: Path) -> BeautifulSoup:
    return BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")


def inner_html(el) -> str:
    if el is None:
        return ""
    return "".join(str(c) for c in el.children)


def wrap_doc_sections(doc_el) -> str:
    """Return documentation inner HTML; wrap loose blocks in project-section (split on h3)."""
    if doc_el is None:
        return ""
    if doc_el.select_one(".project-section"):
        return doc_el.decode_contents()
    children = [c for c in doc_el.children if getattr(c, "name", None)]
    if not children:
        return doc_el.decode_contents()
    blocks: list[list] = []
    cur: list = []
    for ch in children:
        if ch.name == "h3" and cur:
            blocks.append(cur)
            cur = [ch]
        else:
            cur.append(ch)
    if cur:
        blocks.append(cur)
    parts = []
    for group in blocks:
        parts.append('<div class="project-section">\n')
        for node in group:
            parts.append(str(node))
        parts.append("\n        </div>\n")
    return "".join(parts)


def h2_to_h3_keywords(fragment: BeautifulSoup) -> None:
    for h2 in fragment.find_all("h2"):
        h2.name = "h3"


def migrate_file(path: Path, layout_head: str, layout_tail: str) -> bool:
    if path.name == "layout.html":
        return False
    soup = read_soup(path)

    if soup.select_one("link[href='./layout.css']") and soup.select_one(".project-header"):
        return False

    title_tag = soup.find("title")
    title_text = title_tag.get_text(strip=True) if title_tag else path.stem

    h1_el = soup.select_one(".title h1") or soup.select_one(".project-title h1") or soup.find("h1")
    page_h1 = h1_el.get_text(strip=True) if h1_el else title_text

    pv = soup.select_one(".project-visual")
    visual_inner = inner_html(pv).strip() if pv else ""

    details = soup.select_one(".details")
    links_html = ""
    collab_html = ""
    role_html = ""
    tools_html = ""
    keywords_inner = ""

    if details:
        pl = details.select_one(".project-links")
        if pl:
            links_html = inner_html(pl)
        cl = details.select_one(".collaborators-list")
        if cl:
            collab_html = str(cl)
        pr = details.select_one(".project-role")
        if pr:
            role_html = str(pr)
        tc = details.select_one(".tools-container")
        if tc:
            tools_html = str(tc)
        kw = details.select_one(".keywords")
        if kw:
            kfrag = BeautifulSoup(str(kw), "html.parser")
            h2_to_h3_keywords(kfrag)
            kw_el = kfrag.select_one(".keywords") or kfrag
            keywords_inner = kw_el.decode_contents() if kw_el else ""

    if not links_html.strip():
        for tdiv in (soup.select_one(".title"), soup.select_one(".project-title")):
            if tdiv:
                pl = tdiv.select_one(".project-links")
                if pl:
                    links_html = inner_html(pl)
                    break

    if not collab_html.strip():
        collab_html = '<div class="collaborators-list">\n            <p>\n              <span id="collaborators-title">COLLABORATORS:</span>\n            </p>\n          </div>'
    if not role_html.strip():
        role_html = '<div class="project-role">\n            <p>\n              <span id="project-role-title">PROJECT ROLE:</span>\n            </p>\n          </div>'
    if not tools_html.strip():
        tools_html = '<div class="tools-container">\n            <p>\n              <span id="toolkit-title">TOOLKIT:</span>\n            </p>\n          </div>'

    if not keywords_inner.strip():
        keywords_inner = f'<h3 style="color: #6c9bd9">{page_h1}</h3>'

    links_block = ""
    if links_html.strip():
        links_block = f"\n          <div class=\"project-links\">\n            {links_html}\n          </div>"

    header = f"""      <div class="project-header">
        <div class="project-title">
          <h1>{page_h1}</h1>{links_block}
        </div>
        <div class="spacer"></div>
        <div class="details">
          {collab_html}
          {role_html}
          {tools_html}
        </div>
      </div>"""

    doc = soup.select_one(".documentation")
    doc_inner = wrap_doc_sections(doc) if doc else '<div class="project-section"><p></p></div>'

    next_prev = soup.select_one(".nextPrev")
    next_prev_html = str(next_prev) if next_prev else ""

    extra_scripts = []
    for sc in soup.find_all("script"):
        src = sc.get("src") or ""
        if "googletagmanager" in src:
            continue
        if any(x in src for x in ("navbar.js", "script.js", "projects.js")):
            continue
        if src and "player.vimeo.com" in src:
            extra_scripts.append("  " + str(sc))

    extra_str = ("\n" + "\n".join(extra_scripts)) if extra_scripts else ""

    body = f"""  <body>
    <div class="project-container">
{header}
      <div class="project-visual">
        {visual_inner}
      </div>
      <div class="keywords">
        {keywords_inner}
      </div>
      <div class="documentation">
{doc_inner}
      </div>
    </div>
    <!-- Next Previous Buttons Section -->
{next_prev_html}
  </body>{extra_str}
{layout_tail}
"""

    layout_head_use = re.sub(
        r"<title>.*?</title>",
        f"<title>{html.escape(title_text)}</title>",
        layout_head,
        count=1,
        flags=re.DOTALL,
    )
    out = layout_head_use + "\n" + body
    path.write_text(out, encoding="utf-8")
    return True


def main() -> None:
    layout_text = LAYOUT.read_text(encoding="utf-8")
    if "<body>" not in layout_text:
        print("layout.html: missing <body>", file=sys.stderr)
        sys.exit(1)
    i_body = layout_text.find("<body>")
    layout_head = layout_text[:i_body].rstrip()
    i_end = layout_text.find("</body>")
    if i_end < 0:
        print("layout.html: missing </body>", file=sys.stderr)
        sys.exit(1)
    layout_tail = layout_text[i_end + len("</body>") :].lstrip("\n")

    n = 0
    for path in sorted(PAGES.glob("*.html")):
        if path.name == "layout.html":
            continue
        try:
            if migrate_file(path, layout_head, layout_tail):
                print(f"Migrated {path.name}")
                n += 1
            else:
                print(f"Skip {path.name} (already layout)")
        except Exception as e:
            print(f"FAIL {path.name}: {e}", file=sys.stderr)
            raise
    print(f"Done. Migrated {n} files.")


if __name__ == "__main__":
    main()
