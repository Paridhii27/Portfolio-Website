function setPanelImage(src, alt) {
  const panelImage = document.getElementById("about-panel-image");
  if (!panelImage) return;
  panelImage.src = src;
  panelImage.alt = alt;
}

function setActivePanelThumb(thumb) {
  const group = thumb.closest("#gallery-content, #exhibitions-content");
  if (!group) return;

  group.querySelectorAll(".about-panel-thumb").forEach((button) => {
    button.classList.toggle("active", button === thumb);
  });
}

function resetPanelThumbs(containerSelector) {
  const firstThumb = document.querySelector(
    `${containerSelector} .about-panel-thumb`,
  );
  if (!firstThumb) return;
  setPanelImage(firstThumb.dataset.src, firstThumb.dataset.alt);
  setActivePanelThumb(firstThumb);
}

let currentAboutTab = null;

function animatePanelContent(panel) {
  const inner = panel.querySelector(".about-panel-inner");
  if (!inner) return;

  inner.classList.remove("about-animate-in");
  void inner.offsetWidth;
  inner.classList.add("about-animate-in");
}

function showAboutTab(tabId, { animate = true } = {}) {
  const panels = document.querySelectorAll(".about-panel");
  const tabs = document.querySelectorAll("#about-tabs .btn[data-tab]");
  const shouldAnimate =
    animate && currentAboutTab !== null && currentAboutTab !== tabId;

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabId;
    panel.classList.toggle("show", isActive);
    panel.hidden = !isActive;

    if (isActive && shouldAnimate) {
      animatePanelContent(panel);
    }
  });

  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabId;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  currentAboutTab = tabId;

  if (typeof AboutData === "undefined") return;

  const viewportLockTabs = ["exhibitions", "skills", "toolkit"];
  document.body.classList.toggle(
    "about-tab-split-lock",
    viewportLockTabs.includes(tabId),
  );

  if (tabId === "gallery") {
    resetPanelThumbs("#gallery-content");
    return;
  }

  if (tabId === "exhibitions") {
    resetPanelThumbs("#exhibitions-content");
    return;
  }

  const image = AboutData.panelImages?.[tabId];
  if (image) {
    setPanelImage(image.src, image.alt);
  }
}

function initializeAboutTabs() {
  const tabContainer = document.getElementById("about-tabs");
  if (!tabContainer) return;

  tabContainer.addEventListener("click", (event) => {
    const tab = event.target.closest(".btn[data-tab]");
    if (!tab) return;
    showAboutTab(tab.dataset.tab);
  });

  showAboutTab("about", { animate: false });
}

function initializePanelThumbs() {
  const panels = document.getElementById("about-panels");
  if (!panels) return;

  panels.addEventListener("click", (event) => {
    const thumb = event.target.closest(".about-panel-thumb");
    if (!thumb) return;

    setPanelImage(thumb.dataset.src, thumb.dataset.alt);
    setActivePanelThumb(thumb);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeAboutTabs();

  if (typeof AboutData !== "undefined") {
    AboutData.renderGallery();
    AboutData.renderSkills();
    AboutData.renderToolkit();
    AboutData.renderExhibitions();
    initializePanelThumbs();
  }
});
