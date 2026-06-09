const AboutData = {
  /* Contact links data*/
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

  /* Exhibitions data */
  exhibitions: [
    {
      number: "01.",
      name: "Quantum Art: Creative Expressions of the Infamously Counter Intuitive",
      location: "Microscope Gallery, New York, NY",
    },
    {
      number: "02.",
      name: "How to show off quantum computing",
      location: "KISD, Cologne, Germany",
    },
    {
      number: "03.",
      name: "Mosaic Pop Up Show",
      location: "Parsons School of Design, New York, NY",
    },
  ],

  /* Toolkit data */
  toolkit: [
    {
      number: "01.",
      category: "Design Tools",
      description:
        "Adobe Creative Suite (AI, PSD, ID, PR, LR) · TouchDesigner · MadMapper · Isadora · Blender 3D · Unity",
    },
    {
      number: "02.",
      category: "Web Design and Development",
      description:
        "Figma · Webflow · Framer · HTML/CSS · JavaScript · Git/GitHub",
    },
    {
      number: "03.",
      category: "Programming Languages",
      description: "Python · C++ (Arduino) · C# (Unity) · SQL",
    },
    {
      number: "04.",
      category: "Fabrication",
      description: "Laser Cutting · 3D Printing",
    },
    {
      number: "05.",
      category: "Advanced Computing",
      description:
        "APIs (OpenAI, Anthropic, Google's Gemini) · Prompt Engineering · Image Generation · Stable Diffusion · ElevenLabs · Runway ML · Gesture Recognition · Object Detection",
    },
  ],

  /* Render contact links function */
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

  /* Render exhibitions dropdown function */
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

  /* Render toolkit dropdown function */
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

  /* Render resume function */
  renderSkills() {
    const resumeContent = document.getElementById("resume-content");
    if (!resumeContent) return;
    if (!Array.isArray(this.skills) || this.skills.length === 0) {
      resumeContent.innerHTML = "";
      return;
    }

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
