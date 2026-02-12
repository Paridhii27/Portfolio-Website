/**
 * BFCache (back/forward cache) recovery
 *
 * Some browsers restore pages from memory without re-running JS. If our pages
 * rely on DOMContentLoaded-driven rendering/animations, this can occasionally
 * result in an empty/blank-looking page after navigating "Back" on GitHub Pages.
 *
 * On BFCache restore, do a hard reload so all initialization runs again.
 */
window.addEventListener("pageshow", (event) => {
  const navEntry = performance.getEntriesByType?.("navigation")?.[0];
  const isBackForward = navEntry?.type === "back_forward";

  if (event.persisted || isBackForward) {
    window.location.reload();
  }
});

