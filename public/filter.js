/* Scroll functionality for projects*/
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  const containers = document.querySelectorAll(".container");
  containers.forEach((container) => {
    observer.observe(container);
  });

  // Back to top button functionality
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (window.pageYOffset > 300) {
              backToTopButton.classList.add("visible");
            } else {
              backToTopButton.classList.remove("visible");
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Immediate animation for containers already in view on page load
  window.addEventListener("load", () => {
    containers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        container.classList.add("animate");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

/* Filtering projects into categories function */

function filterSelection(c) {
  var x, i;
  var projectsSection = document.getElementById("projects-section");
  x = document.getElementsByClassName("container");
  if (c == "all") {
    c = "";
    // Add class to indicate "all" filter is active
    if (projectsSection) {
      projectsSection.classList.add("filter-all");
    }
  } else {
    // Remove class when specific filter is active
    if (projectsSection) {
      projectsSection.classList.remove("filter-all");
    }
  }
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Initialize filter functionality when DOM is ready
function initializeFilters() {
  var btnContainer = document.getElementById("filterBtns");
  if (!btnContainer) return;

  btnContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
      // Get the filter category from data-filter attribute
      var filterCategory = e.target.getAttribute("data-filter");

      // Calling filterSelection with the category
      filterSelection(filterCategory);

      // Update active class and aria-pressed states
      var current = document.getElementsByClassName("active");
      // Update aria-pressed for previous active button
      if (current[0]) {
        current[0].className = current[0].className.replace(" active", "");
        current[0].setAttribute("aria-pressed", "false");
      }
      // Update aria-pressed for new active button
      e.target.className += " active";
      e.target.setAttribute("aria-pressed", "true");
    }
  });

  // Initialize with "all" filter
  filterSelection("all");
}

// Wait for DOM to be ready and projects to be rendered
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    // Wait a bit for projects to be rendered
    setTimeout(initializeFilters, 100);
  });
} else {
  setTimeout(initializeFilters, 100);
}
