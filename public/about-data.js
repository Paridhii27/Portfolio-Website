/**
 * About Page Data Structure
 * Contains gallery images and contact information
 */

const AboutData = {
  /**
   * Contact links data
   */
  contactLinks: [
    {
      id: "email",
      href: "mailto:paridhigarg27@gmail.com?subject=Hello&body=Hi%20there",
      defaultLogo: "./assets/images/logos/contact/email.png",
      hoverLogo: "./assets/images/logos/contact/emailHover.png",
      alt: "Email Logo",
      hoverAlt: "email Hover Logo",
    },
    {
      id: "instagram",
      href: "https://www.instagram.com/paridhiii_27/",
      target: "_blank",
      defaultLogo: "./assets/images/logos/contact/instagram.png",
      hoverLogo: "./assets/images/logos/contact/InstagramHover.png",
      alt: "Instagram Logo",
      hoverAlt: "instagram Hover Logo",
    },
    {
      id: "github",
      href: "https://github.com/Paridhii27",
      target: "_blank",
      defaultLogo: "./assets/images/logos/contact/github.png",
      hoverLogo: "./assets/images/logos/contact/githubHover.png",
      alt: "gitHub logo",
      hoverAlt: "gitHub Hover Logo",
    },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/paridhi-garg-a15824234/",
      target: "_blank",
      defaultLogo: "./assets/images/logos/contact/linkedin.png",
      hoverLogo: "./assets/images/logos/contact/LinkedInHover.png",
      alt: "LinkedIn Logo",
      hoverAlt: "LinkedIn Hover Logo",
    },
  ],

  /**
   * Exhibitions data
   */
  exhibitions: [
    {
      number: "01.",
      name: "Quantum Art: Creative Expressions of the Infamously Counter Intuitive",
      location: "Microscope Gallery, New York, NY",
    },
    {
      number: "03.",
      name: "How to show off quantum computing",
      location: "KISD, Cologne, Germany",
    },
    {
      number: "04.",
      name: "Mosaic Pop Up Show",
      location: "Parsons School of Design, New York, NY",
    },
  ],

  /**
   * Toolkit data
   */
  toolkit: [
    {
      number: "01.",
      category: "Frameworks",
      description:
        "Figma · Adobe Creative Suite (AI, PSD, ID, PR, LR) · Touchdesigner · Blender 3D · Unity · Madmapper · Isadora · Framer · Webflow · Git/GitHub · Microsoft Suite",
    },
    {
      number: "02.",
      category: "Programming Languages",
      description:
        "Python · JavaScript (Node.js, Deno, Express.js) · C++ (Arduino) · C# (Unity) · SQL · HTML/CSS",
    },
    {
      number: "03.",
      category: "Digital Fabrication",
      description: "Laser Cutting · 3D Printing",
    },
    {
      number: "04.",
      category: "Advanced Computing",
      description:
        "APIs (OpenAI, Anthropic, Google's Gemini) · Training text generation models · prompt engineering for text generation · Image generation · ElevenLabs · text-to-speech · speech-to-text · Runway ML · Stable Diffusion · Gesture Recognition · Object Detection",
    },
  ],

  /**
   * Render gallery images
   */
  renderGallery() {
    const galleryContent = document.getElementById("gallery-content");
    if (!galleryContent) return;

    const columns = ["column1", "column2", "column3"];
    const columnsHTML = columns
      .map((columnKey) => {
        const images = this.galleryImages[columnKey];
        const imagesHTML = images
          .map((img) => {
            const widthAttr = img.width ? `width="${img.width}"` : "";
            const heightAttr = img.height ? `height="${img.height}"` : "";
            return `
          <div class="grid-item">
            <img
              src="${img.src}"
              alt="${img.alt}"
              loading="lazy"
              decoding="async"
              ${widthAttr}
              ${heightAttr}
            />
          </div>
        `;
          })
          .join("");

        return `<div class="grid-column">${imagesHTML}</div>`;
      })
      .join("");

    galleryContent.innerHTML = `<div class="image-grid">${columnsHTML}</div>`;
  },

  /**
   * Render contact links
   */
  renderContactLinks() {
    const contactLinksContainer = document.querySelector(".contact-links");
    if (!contactLinksContainer) return;

    const linksHTML = this.contactLinks
      .map((contact) => {
        const targetAttr = contact.target ? `target="${contact.target}"` : "";
        return `
        <div class="contact">
          <a
            href="${contact.href}"
            ${targetAttr}
            class="footer-link"
            id="${contact.id}"
          >
            <img
              src="${contact.defaultLogo}"
              alt="${contact.alt}"
              class="default-logo"
              loading="lazy"
            />
            <img
              src="${contact.hoverLogo}"
              alt="${contact.hoverAlt}"
              class="hover-logo"
              loading="lazy"
            />
          </a>
        </div>
      `;
      })
      .join("");

    contactLinksContainer.innerHTML = linksHTML;
  },

  /**
   * Render exhibitions dropdown
   */
  renderExhibitions() {
    const exhibitionsContent = document.getElementById("exhibitions-content");
    if (!exhibitionsContent) return;

    const exhibitionsHTML = this.exhibitions
      .map((exhibition) => {
        return `
        <div class="exhibition-item">
          <span class="exhibition-number">${exhibition.number}</span>
          <div class="exhibition-content">
            <strong>${exhibition.name}</strong>
            <span>${exhibition.location}</span>
          </div>
        </div>
      `;
      })
      .join("");

    exhibitionsContent.innerHTML = exhibitionsHTML;
  },

  /**
   * Render toolkit dropdown
   */
  renderToolkit() {
    const toolkitContent = document.getElementById("toolkit-content");
    if (!toolkitContent) return;

    const toolkitHTML = this.toolkit
      .map((tool) => {
        return `
        <div class="toolkit-item">
          <span class="toolkit-number">${tool.number}</span>
          <div class="toolkit-content-wrapper">
            <strong>${tool.category}</strong>
            <span>${tool.description}</span>
          </div>
        </div>
      `;
      })
      .join("");

    toolkitContent.innerHTML = toolkitHTML;
  },

  /**
   * Render skills in resume modal
   */
  renderSkills() {
    const resumeContent = document.getElementById("resume-content");
    if (!resumeContent) return;

    const skillsHTML = this.skills
      .map((skill, index) => {
        const separator =
          index < this.skills.length - 1
            ? '<div class="skill-separator"></div>'
            : "";
        return `
        <div class="skill-item">
          <span class="skill-number">${skill.number}</span>
          <div class="skill-content">
            <h2 class="skill-category">${skill.category}</h2>
            <p class="skill-description">${skill.description}</p>
          </div>
        </div>
        ${separator}
      `;
      })
      .join("");

    resumeContent.innerHTML = `
      <div class="skills-wrapper">
        <h1 class="skills-title">SKILLS</h1>
        <div class="skills-list">${skillsHTML}</div>
        <div class="download-btn-container">
          <button class="download-btn" onclick="downloadPDF()">
            DOWNLOAD FULL RESUME
          </button>
          <a
            id="downloadLink"
            href="./assets/images/Paridhi-Resume-2026.pdf"
            download="Paridhi-Garg-Resume.pdf"
            style="display: none"
          >
          </a>
        </div>
      </div>
    `;
  },
};
