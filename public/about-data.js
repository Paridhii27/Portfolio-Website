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

  /* Gallery images */
  galleryImages: [
    { src: "./assets/images/about/1.jpg", alt: "Gallery photo 1" },
    { src: "./assets/images/about/5.JPG", alt: "Gallery photo 2" },
    { src: "./assets/images/about/2.JPG", alt: "Gallery photo 3" },
    { src: "./assets/images/about/9.jpeg", alt: "Gallery photo 4" },
    { src: "./assets/images/about/10.jpg", alt: "Gallery photo 5" },
    { src: "./assets/images/about/11.JPG", alt: "Gallery photo 6" },
    { src: "./assets/images/about/7.jpg", alt: "Gallery photo 7" },
    { src: "./assets/images/about/8.jpg", alt: "Gallery photo 8" },
    { src: "./assets/images/about/12.jpg", alt: "Gallery photo 9" },
  ],

  /* Exhibitions data */
  exhibitions: [
    {
      id: "ibm-quantum",
      number: "01.",
      label: "IBM Quantum",
      name: "Quantum Art: Creative Expressions of the Infamously Counter Intuitive",
      location: "Microscope Gallery, New York, NY",
      images: [
        {
          src: "./assets/images/project-pages/move-a-bit/9.png",
          alt: "Move a Bit at KISD",
        },
        {
          src: "./assets/images/thumbnails/move-a-bit.jpg",
          alt: "Move a Bit installation",
        },
      ],
    },
    {
      id: "dlr-institute",
      number: "02.",
      label: "DLR Institute of AI Safety and Security",
      name: "How to show off quantum computing",
      location: "KISD, Cologne, Germany",
      images: [
        {
          src: "./assets/images/thumbnails/fleeting-states-two.png",
          alt: "Fleeting States at Mosaic Pop Up Show",
        },
        {
          src: "./assets/images/project-pages/fleeting-states/render3.png",
          alt: "Fleeting States installation",
        },
      ],
    },
    {
      id: "mosaic-pop-up",
      number: "03.",
      label: "Mosaic Pop up Show",
      name: "Mosaic Pop Up Show",
      location: "Parsons School of Design, New York, NY",
      images: [
        {
          src: "./assets/images/project-pages/this-machine-is-a-stranger/main-visual.jpg",
          alt: "This Machine is a Stranger at Quantum Art",
        },
        {
          src: "./assets/images/project-pages/this-machine-is-a-stranger/thesis.jpeg",
          alt: "This Machine is a Stranger thesis installation",
        },
      ],
    },
  ],

  panelImages: {
    about: {
      src: "./assets/images/about/me.png",
      alt: "Paridhi Garg",
    },
    gallery: {
      src: "./assets/images/about/5.JPG",
      alt: "Gallery",
    },
    skills: {
      src: "./assets/images/about/main.png",
      alt: "Paridhi Garg",
    },
    toolkit: {
      src: "./assets/images/thumbnails/computerized-memories.jpg",
      alt: "3D Render of desk",
    },
    exhibitions: {
      src: "./assets/images/project-pages/this-machine-is-a-stranger/main-visual.jpg",
      alt: "This Machine is a Stranger exhibition",
    },
  },

  skills: [
    {
      number: "01.",
      category: "Experience Design",
      description:
        "Designing moments of human connection that leave a lasting impression.",
    },
    {
      number: "02.",
      category: "Product & Interface Design",
      description:
        "Building AI products and shaping how they fit into everyday life.",
    },
    {
      number: "03.",
      category: "Creative Technology",
      description:
        "Pushing the boundaries of design and technology to realize new ideas.",
    },
    {
      number: "04.",
      category: "Research",
      description:
        "Exploring human behavior, memory, and perception in everyday contexts to design human systems.",
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
        "Figma · Webflow · Framer · HTML/CSS · JavaScript · React · TypeScript · Git/GitHub",
    },
    {
      number: "03.",
      category: "Technical Prototyping",
      description:
        "Python · C++ (Arduino) · C# (Unity) · SQL · MediaPipe · Computer Vision / Object Detection",
    },
    {
      number: "04.",
      category: "AI + Generative Media",
      description:
        "OpenAI · Anthropic · Gemini · Perplexity · Notebook LM · Stable Diffusion · Midjourney · ElevenLabs · Runway ML · Cursor · Claude Code · Hugging Face",
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

  renderListItems(items) {
    return items
      .map(
        (item) => `
        <div class="about-list-item">
          <span class="about-list-number">${item.number}</span>
          <div class="about-list-body">
            <strong>${item.category || item.name}</strong>
            <span>${item.description || item.location}</span>
          </div>
        </div>
      `,
      )
      .join("");
  },

  renderImageThumbs(images) {
    if (!Array.isArray(images) || images.length === 0) return "";

    return images
      .map(
        (image) => `
        <button
          type="button"
          class="about-panel-thumb"
          data-src="${image.src}"
          data-alt="${image.alt}"
          aria-label="View ${image.alt}"
        >
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
        </button>
      `,
      )
      .join("");
  },

  renderGallery() {
    const galleryContent = document.getElementById("gallery-content");
    if (!galleryContent || !Array.isArray(this.galleryImages)) return;
    galleryContent.innerHTML = `<div class="about-gallery-grid">${this.renderImageThumbs(this.galleryImages)}</div>`;
  },

  renderExhibitions() {
    const exhibitionsContent = document.getElementById("exhibitions-content");
    if (!exhibitionsContent || !Array.isArray(this.exhibitions)) return;

    const entriesHTML = this.exhibitions
      .map(
        (exhibition) => `
        <div class="about-exhibition-entry">
          <div class="about-list-item">
            <span class="about-list-number">${exhibition.number}</span>
            <div class="about-list-body">
              <strong>${exhibition.name}</strong>
              <span>${exhibition.location}</span>
            </div>
          </div>
          <div class="about-exhibition-images">
            ${this.renderImageThumbs(exhibition.images || [])}
          </div>
        </div>
      `,
      )
      .join("");

    exhibitionsContent.innerHTML = entriesHTML;
  },

  renderToolkit() {
    const toolkitContent = document.getElementById("toolkit-content");
    if (!toolkitContent) return;
    toolkitContent.innerHTML = this.renderListItems(this.toolkit);
  },

  renderSkills() {
    const skillsContent = document.getElementById("skills-content");
    if (!skillsContent || !Array.isArray(this.skills)) return;
    skillsContent.innerHTML = this.renderListItems(this.skills);
  },
};
