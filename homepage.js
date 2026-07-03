// Project data - content managed via JavaScript
const projects = {
  "move-a-bit": {
    image: "./public/assets/images/thumbnails/move-a-bit.jpg",
    video: "./public/assets/videos/moveabit.mp4",
    title: "Move a Bit",
    year: "2022",
    discipline: "Experience Design",
    tools: [
      "Quantum Computing",
      "Motion Capture",
      "Interactive Installation",
      "Science Communication",
    ],
    description:
      '<span class="project-title-italics">Move a Bit</span> features a live motion capture experience bringing quantum computing to life through an interactive display that visually showcases entanglement.',
    url: "./public/project-pages/move-a-bit.html",
  },
  limen: {
    image: "./public/assets/images/project-pages/limen/thumbnail.png",
    video: "./public/assets/images/project-pages/limen/prospect2.mp4",
    title: "Limen",
    year: "2026",
    discipline: "Product Design",
    tools: ["Multisensory", "AI Object", "Spatial Interaction"],
    description:
      '<span class="project-title-italics">Limen</span> is a spatial tool that uses lightweight context—location, time and weather—to deliver brief multi-sensory prompts that encourage you to notice and observe your surroundings more deeply.',
    url: "./public/project-pages/limen.html",
  },
  "machine-stranger": {
    image: "./public/assets/images/thumbnails/machine-stranger.jpg",
    video: "./public/assets/videos/thismachine.mp4",
    title: "This Machine is a Stranger",
    year: "2025",
    discipline: "Research",
    tools: [
      "Human-Machine Interaction",
      "Computational Autonomy",
      "AI Ethics",
      "Interactive Installation",
    ],
    description:
      '<span class="project-title-italics">This Machine is a Stranger</span> is a research-led experience designed to investigate how much a person implicitly trusts or mistrusts unfamiliar machines and algorithms.',
    url: "./public/project-pages/this-machine-is-a-stranger.html",
  },
  "fleeting-states": {
    image: "./public/assets/images/thumbnails/fleeting-states-two.png",
    video: "./public/assets/videos/fleetingstates.mp4",
    title: "Fleeting States + Measured Values",
    year: "2024",
    discipline: "Experience Design",
    tools: [
      "Multimedia",
      "LED Mapping",
      "Quantum Physics",
      "Science Communication",
      "Interactive Installation",
    ],
    description:
      '<span class="project-title-italics">Fleeting States + Measured Values</span> depicts the visible and invisible sides of quantum computing through a touchscreen interface and programmable LED qubits.',
    url: "./public/project-pages/fleeting-states.html",
  },
};

// Track currently featured project index
let currentFeaturedIndex = 0;
const allProjectIds = Object.keys(projects);

/** Only the active accordion card keeps a real video src; others use data-src to avoid ~50MB+ parallel downloads. */
function setVideoElForPosition(videoEl, project, pos) {
  const isActive = pos === 0;
  if (!isActive) {
    videoEl.removeAttribute("src");
    videoEl.setAttribute("data-src", project.video);
    videoEl.loop = true;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.setAttribute("playsinline", "");
    videoEl.preload = "none";
    videoEl.removeAttribute("autoplay");
    videoEl.pause();
    videoEl.load();
    return;
  }

  videoEl.src = project.video;
  videoEl.removeAttribute("data-src");
  videoEl.poster = project.image;
  videoEl.loop = true;
  videoEl.muted = true;
  videoEl.playsInline = true;
  videoEl.setAttribute("playsinline", "");
  videoEl.setAttribute("autoplay", "");
  videoEl.preload = "metadata";
}

function renderAccordion() {
  const container = document.getElementById("projects-accordion");
  if (!container) return;

  container.innerHTML = "";

  allProjectIds.forEach((projectId, index) => {
    const project = projects[projectId];

    // Create card element
    const card = document.createElement("div");
    card.className = "accordion-card";

    // Calculate relative position: 0 is active, 1 is behind, 2 is behind that, 3 is back
    const pos =
      (index - currentFeaturedIndex + allProjectIds.length) %
      allProjectIds.length;
    card.dataset.pos = pos;
    card.dataset.projectId = projectId;

    if (pos === 0) {
      card.classList.add("active");
    }

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", pos === 0 ? "true" : "false");

    // Create media element (video or img)
    const isGif = project.video && project.video.toLowerCase().endsWith(".gif");
    const hasVideo = project.video && !isGif;

    let mediaHTML = "";
    if (hasVideo) {
      const videoTag =
        pos === 0
          ? `<video poster="${project.image}" loop muted playsinline preload="metadata" autoplay src="${project.video}"></video>`
          : `<video poster="${project.image}" loop muted playsinline preload="none" data-src="${project.video}"></video>`;
      mediaHTML = videoTag;
    } else if (isGif) {
      mediaHTML = `<img src="${project.video}" alt="${project.title}" loading="lazy" />`;
    } else {
      mediaHTML = `<img src="${project.image}" alt="${project.title}" loading="lazy" />`;
    }

    card.innerHTML = `
      <span class="arrow-link" aria-hidden="true">&nearr;</span>
      <div class="accordion-media-wrapper">
        ${mediaHTML}
        <div class="accordion-overlay"></div>
      </div>
      <div class="accordion-title-top">
        <span>${project.title}</span>
      </div>
      <div class="accordion-content">
        <div class="accordion-info">
          <span class="project-discipline">${project.discipline}</span>
          <div class="project-title" style="margin-bottom: var(--spacing-sm);">
            ${project.title}
          </div>
          <p class="project-description">${project.description}</p>
        </div>
      </div>
    `;

    // Handle activation
    const activateCard = (e) => {
      if (card.classList.contains("active")) {
        // If clicking the active card, navigate to the project page
        window.location.href = project.url;
        return;
      }

      e.preventDefault();

      currentFeaturedIndex = allProjectIds.indexOf(projectId);

      // Update all cards' positions and video loading
      document.querySelectorAll(".accordion-card").forEach((c) => {
        const currentId = c.dataset.projectId;
        const originalIndex = allProjectIds.indexOf(currentId);
        const newPos =
          (originalIndex - currentFeaturedIndex + allProjectIds.length) %
          allProjectIds.length;

        c.dataset.pos = newPos;

        if (newPos === 0) {
          c.classList.add("active");
          c.setAttribute("aria-expanded", "true");
          const proj = projects[currentId];
          const video = c.querySelector("video");
          if (
            video &&
            proj.video &&
            !proj.video.toLowerCase().endsWith(".gif")
          ) {
            setVideoElForPosition(video, proj, 0);
            video
              .play()
              .catch((err) => console.log("Video play prevented:", err));
          }
        } else {
          c.classList.remove("active");
          c.setAttribute("aria-expanded", "false");
          const proj = projects[currentId];
          const video = c.querySelector("video");
          if (
            video &&
            proj.video &&
            !proj.video.toLowerCase().endsWith(".gif")
          ) {
            setVideoElForPosition(video, proj, newPos);
          }
        }
      });
    };

    card.addEventListener("click", activateCard);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        activateCard(e);
      }
    });

    container.appendChild(card);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  renderAccordion();

  // Add scroll reveal animation for the accordion container
  const accordionContainer = document.querySelector(
    ".featured-projects-accordion",
  );
  if (accordionContainer) {
    // Check if IntersectionObserver is supported (for older browsers)
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              // Stop observing once the animation has been triggered
              observer.unobserve(entry.target);
            }
          });
        },
        {
          // Trigger when at least 10% of the container is visible
          threshold: 0.1,
          // Start animation slightly before it scrolls fully into view
          rootMargin: "0px 0px -50px 0px",
        },
      );

      observer.observe(accordionContainer);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      accordionContainer.classList.add("is-visible");
    }
  }
});
