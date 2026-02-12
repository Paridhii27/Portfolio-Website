// Project data - content managed via JavaScript
const projects = {
  "machine-stranger": {
    image: "./public/assets/images/thumbnails/machine-stranger.jpg",
    video: "./public/assets/videos/thismachine.mp4",
    title: "This Machine is a Stranger",
    description:
      '"This Machine is a Stranger" investigates how one can navigate life at the intersection of human intuition and the quiet, calculated logic of autonomous machines, questioning how much a person implicitly trusts or mistrusts a machine..',
    url: "./public/project-pages/this-machine-is-a-stranger.html",
  },
  "fleeting-states": {
    image: "./public/assets/images/thumbnails/fleeting-states-two.png",
    video: "./public/assets/videos/fleetingstates.mp4",
    title: "Fleeting States + Measured Values",
    description:
      "Fleeting States + Measured Values depicts the visible and invisible sides of quantum computing through a touchscreen interface and programmable LED qubits.",
    url: "./public/project-pages/fleeting-states.html",
  },
  "move-a-bit": {
    image: "./public/assets/images/thumbnails/move-a-bit.jpg",
    video: "./public/assets/videos/moveabit.mp4",
    title: "Move A Bit",
    description:
      "Move a Bit features a live motion capture experience bringing quantum computing to life through an interactive display that visually showcases entanglement.",
    url: "./public/project-pages/move-a-bit.html",
  },
  "granny-bytes": {
    image: "./public/assets/images/thumbnails/granny-bytes.png",
    video: "./public/assets/videos/grannybytes.gif",
    title: "Granny Bytes",
    description:
      "Granny Bytes explores intergenerational connections and how they can manifest within our interactions with technology.",
    url: "./public/project-pages/granny-bytes.html",
  },
};

// Track currently featured project
let currentFeaturedProject = "machine-stranger";

// Get all project IDs
const allProjectIds = Object.keys(projects);

// Function to get thumbnail projects (all except the featured one)
function getThumbnailProjects(featuredId) {
  return allProjectIds.filter((id) => id !== featuredId);
}

// Function to update the main featured project display
function updateFeaturedProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  // Update current featured project
  currentFeaturedProject = projectId;

  // Get DOM elements
  const mainLink = document.getElementById("main-featured-link");
  const mainTitle = document.getElementById("main-featured-title");
  const mainDescription = document.getElementById("main-featured-description");

  // Get or create media container
  const mainImage = document.getElementById("main-featured-image");
  const mainVideo = document.getElementById("main-featured-video");
  const mediaContainer = document.getElementById(
    "main-featured-media-container",
  );

  // Handle video vs image display (GIFs use img element since video doesn't support them)
  const isGif = project.video && project.video.toLowerCase().endsWith(".gif");
  const hasVideo = project.video && !isGif;

  if (hasVideo) {
    // If project has video, show video instead of image
    if (mainImage) {
      mainImage.style.display = "none";
    }

    // Create video element if it doesn't exist
    let videoElement = mainVideo;
    if (!videoElement) {
      videoElement = document.createElement("video");
      videoElement.id = "main-featured-video";
      videoElement.setAttribute("autoplay", "");
      videoElement.setAttribute("loop", "");
      videoElement.setAttribute("muted", "");
      videoElement.setAttribute("playsinline", "");
      videoElement.setAttribute("poster", project.image);
      videoElement.setAttribute("preload", "auto");
      videoElement.className = ""; // Clear any classes

      // Insert video into media container
      if (mediaContainer) {
        mediaContainer.appendChild(videoElement);
      } else if (mainImage && mainImage.parentNode) {
        mainImage.parentNode.insertBefore(videoElement, mainImage);
      }
    }

    // Update video source and attributes
    videoElement.src = project.video;
    videoElement.poster = project.image;
    videoElement.style.display = "block";
    // Ensure video plays automatically
    videoElement.play().catch((error) => {
      // Autoplay was prevented, but video will play when user interacts
      console.log("Video autoplay prevented:", error);
    });
  } else if (isGif) {
    // GIF: use image element (GIFs animate in img, video element doesn't support them)
    if (mainVideo) {
      mainVideo.style.display = "none";
    }
    if (mainImage) {
      mainImage.src = project.video;
      mainImage.alt = project.title;
      mainImage.style.display = "block";
    }
  } else {
    // If project doesn't have video, show image and make it clickable
    if (mainVideo) {
      mainVideo.style.display = "none";
    }

    if (mainImage) {
      mainImage.src = project.image;
      mainImage.alt = project.title;
      mainImage.style.display = "block";
    }
  }

  if (mainLink && project.url) {
    mainLink.href = project.url;
    mainLink.setAttribute("aria-label", `View ${project.title} project`);
  }
  if (mainTitle) {
    mainTitle.textContent = project.title;
  }
  if (mainDescription) {
    mainDescription.textContent = project.description;
  }

  // Update thumbnails to show all other projects
  updateThumbnails(projectId);
}

// Function to update thumbnail displays
function updateThumbnails(featuredId) {
  const thumbnailProjects = getThumbnailProjects(featuredId);
  const thumbnailElements = document.querySelectorAll(".project-thumbnail");

  thumbnailElements.forEach((thumbnail, index) => {
    if (index < thumbnailProjects.length) {
      const projectId = thumbnailProjects[index];
      const project = projects[projectId];

      if (project) {
        // Update data attribute
        thumbnail.dataset.projectId = projectId;

        // Update image
        const img = thumbnail.querySelector("img");
        if (img) {
          img.src = project.image;
          img.alt = project.title;
        }

        // Update title below thumbnail
        let titleEl = thumbnail.querySelector(".project-thumbnail-title");
        if (!titleEl) {
          titleEl = document.createElement("span");
          titleEl.className = "project-thumbnail-title";
          thumbnail.appendChild(titleEl);
        }
        titleEl.textContent = project.title;

        // Update active state
        thumbnail.classList.remove("active");
      }
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize thumbnails with default state (all projects except machine-stranger)
  updateThumbnails("machine-stranger");

  // Initialize the main featured project
  updateFeaturedProject("machine-stranger");

  // Force video autoplay for Safari compatibility
  const mainVideo = document.getElementById("main-featured-video");
  if (mainVideo) {
    // Try to play the video
    const playPromise = mainVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video is playing
          console.log("Video autoplay started");
        })
        .catch((error) => {
          // Autoplay was prevented - show poster/thumbnail instead
          console.log("Video autoplay prevented, showing poster:", error);
          // The poster attribute will show the thumbnail
        });
    }

    // Also try playing on user interaction (click anywhere on page)
    const tryPlayVideo = () => {
      if (mainVideo.paused) {
        mainVideo.play().catch(() => {
          // Still can't play, that's okay
        });
      }
    };

    // Try to play on first user interaction
    document.addEventListener("click", tryPlayVideo, { once: true });
    document.addEventListener("touchstart", tryPlayVideo, { once: true });
  }

  // Add click and keyboard event listeners to thumbnails
  const thumbnails = document.querySelectorAll(".project-thumbnail");
  const handleThumbnailSelect = function (e) {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    if (e.type === "keydown") e.preventDefault();
    const projectId = this.dataset.projectId;
    if (projectId && projectId !== currentFeaturedProject) {
      this.style.transform = "scale(0.95)";
      const el = this;
      setTimeout(() => {
        el.style.transform = "";
        updateFeaturedProject(projectId);
      }, 150);
    }
  };
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", handleThumbnailSelect);
    thumbnail.addEventListener("keydown", handleThumbnailSelect);
  });

  // Wrap updateFeaturedProject to add smooth transitions
  const originalUpdateFeaturedProject = updateFeaturedProject;

  // Override with enhanced version
  window.updateFeaturedProject = function (projectId) {
    const mediaContainer = document.getElementById(
      "main-featured-media-container",
    );
    const projectInfo = document.querySelector(".project-info");

    if (mediaContainer) {
      mediaContainer.style.opacity = "0";
      mediaContainer.style.transform = "scale(0.98)";
    }
    if (projectInfo) {
      projectInfo.style.opacity = "0";
      projectInfo.style.transform = "translateY(10px)";
    }

    setTimeout(() => {
      originalUpdateFeaturedProject(projectId);

      setTimeout(() => {
        if (mediaContainer) {
          mediaContainer.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";
          mediaContainer.style.opacity = "1";
          mediaContainer.style.transform = "scale(1)";
        }
        if (projectInfo) {
          projectInfo.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";
          projectInfo.style.opacity = "1";
          projectInfo.style.transform = "translateY(0)";
        }
      }, 50);
    }, 200);
  };
});
