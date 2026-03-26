#!/usr/bin/env python3
"""
One-off migration helper for project-pages HTML (requires: pip install beautifulsoup4).
Do not re-run on already migrated files unless restoring from git first.
"""

import re
import sys
from pathlib import Path

try:
    from bs4 import BeautifulSoup, NavigableString
except ImportError:
    print("Install: pip install beautifulsoup4", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent / "public" / "project-pages"

INLINE_WRAPPER_CLASSES = frozenset(
    {
        "inline-img-container",
        "inline-video-container",
        "inline-img-grid",
        "inline-img-grid-three",
        "inline-video-grid",
        "inline-img-gallery",
    }
)


def is_inline_block(tag):
    if not getattr(tag, "name", None) or tag.name != "div":
        return False
    classes = tag.get("class") or []
    return bool(INLINE_WRAPPER_CLASSES & set(classes))


def wrap_documentation(doc_div, soup):
    if not doc_div:
        return
    nodes = []
    for child in list(doc_div.children):
        if isinstance(child, NavigableString):
            if str(child).strip():
                nodes.append(child)
        elif child.name:
            nodes.append(child)

    segments = []
    i = 0
    while i < len(nodes):
        n = nodes[i]
        if getattr(n, "name", None) == "h3":
            title = n.extract()
            i += 1
            block = []
            while i < len(nodes):
                if getattr(nodes[i], "name", None) == "h3":
                    break
                block.append(nodes[i].extract())
                i += 1
            segments.append((title, block))
        else:
            preamble = []
            while i < len(nodes) and getattr(nodes[i], "name", None) != "h3":
                preamble.append(nodes[i].extract())
                i += 1
            if preamble:
                segments.append((None, preamble))

    doc_div.clear()
    for title, block in segments:
        section = soup.new_tag("div", attrs={"class": "project-section"})
        pcc = soup.new_tag("div", attrs={"class": "project-content-container"})
        if title is not None:
            pcc.append(title)
        for node in block:
            if getattr(node, "name", None) and is_inline_block(node):
                if pcc.contents:
                    section.append(pcc)
                    pcc = soup.new_tag("div", attrs={"class": "project-content-container"})
                section.append(node)
            else:
                pcc.append(node)
        if pcc.contents:
            section.append(pcc)
        doc_div.append(section)


def migrate_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    soup = BeautifulSoup(text, "html.parser")

    link = soup.find("link", href=re.compile(r"all-projects\.css"))
    if link:
        link["href"] = "./layout.css"

    html_root = soup.find("html")
    body = soup.find("body")
    if not body or not html_root:
        return text

    project_visual = body.find("div", class_="project-visual")
    title_div = body.find("div", class_="title")
    project_container = body.find("div", class_="project-container")
    next_prev = body.find("div", class_="nextPrev")

    if not project_container or not project_visual:
        return text

    extra_body_scripts = []
    for s in list(body.find_all("script", src=True)):
        src = s.get("src", "")
        if "googletagmanager" in src or not src:
            continue
        if src in ("../navbar.js", "../../script.js", "./projects.js"):
            s.decompose()
            continue
        if "player.vimeo.com" in src:
            extra_body_scripts.append(src)
            s.decompose()
            continue

    details = project_container.find("div", class_="details")
    documentation = project_container.find("div", class_="documentation")

    keywords_div = None
    project_links_div = None
    if details:
        keywords_div = details.find("div", class_="keywords")
        if keywords_div:
            for h2 in keywords_div.find_all("h2"):
                h2.name = "h3"
        project_links_div = details.find("div", class_="project-links")

    h1 = title_div.find("h1") if title_div else None

    header = soup.new_tag("div", attrs={"class": "project-header"})
    pt = soup.new_tag("div", attrs={"class": "project-title"})
    if h1:
        pt.append(h1.extract())
    if project_links_div:
        pt.append(project_links_div.extract())
    header.append(pt)
    header.append(soup.new_tag("div", attrs={"class": "spacer"}))

    new_details = soup.new_tag("div", attrs={"class": "details"})
    if details:
        for child in list(details.children):
            if not getattr(child, "name", None):
                continue
            c = child.get("class") or []
            if "keywords" in c or "project-links" in c:
                continue
            new_details.append(child.extract())

    header.append(new_details)

    new_container = soup.new_tag("div", attrs={"class": "project-container"})
    new_container.append(header)
    new_container.append(project_visual.extract())

    if keywords_div:
        new_container.append(keywords_div.extract())

    if documentation:
        doc = documentation.extract()
        wrap_documentation(doc, soup)
        new_container.append(doc)

    project_container.replace_with(new_container)

    if title_div:
        title_div.decompose()

    for hr in body.find_all("hr"):
        hr.decompose()

    if next_prev:
        next_prev.extract()

    for s in list(body.find_all("script", src=True)):
        src = s.get("src", "")
        if src in ("../navbar.js", "../../script.js", "./projects.js"):
            s.decompose()

    if next_prev:
        body.append(next_prev)

    for s in list(html_root.find_all("script", src=True)):
        if s.parent == html_root:
            src = s.get("src", "")
            if src in ("../navbar.js", "../../script.js", "./projects.js") or (
                "player.vimeo.com" in src
            ):
                s.decompose()

    ref = body
    for src in ["../navbar.js", "../../script.js", "./projects.js"] + extra_body_scripts:
        tag = soup.new_tag("script", src=src)
        ref.insert_after(tag)
        ref = tag

    return str(soup)


def main():
    for p in sorted(ROOT.glob("*.html")):
        if p.name == "layout.html":
            continue
        out = migrate_file(p)
        p.write_text(out, encoding="utf-8")
        print("migrated", p.name)


if __name__ == "__main__":
    main()
