/**
 * Projects Data Structure
 * Centralized data for all projects
 */

const ProjectsData = {
  projects: [
    {
      id: "machine-stranger",
      title: "This Machine is a Stranger",
      class: "research",
      year: "2025",
      description:
        '<span class="project-title-italics">This Machine is a Stranger</span> is a thought experiment that investigates how one navigates life at the intersection of human intuition and the quiet, calculated logic of autonomous machines, questioning how much a person implicitly trusts or mistrusts a machine.',
      thumbnail: "./assets/images/thumbnails/machine-stranger.jpg",
      url: "./project-pages/this-machine-is-a-stranger.html",
      categories: ["interactive", "aiweb"],
      tools: [
        "Human-Machine Interaction",
        "Computational Autonomy",
        "AI Ethics",
        "Interactive Installation",
      ],
    },
    {
      id: "fleeting-states",
      title: "Fleeting States + Measured Values",
      year: "2024",
      description:
        '<span class="project-title-italics">Fleeting States + Measured Values</span> depicts the visible and invisible sides of quantum computing through a touchscreen interface and programmable LED qubits.',
      thumbnail: "./assets/images/thumbnails/fleeting-states.jpg",
      url: "./project-pages/fleeting-states.html",
      categories: ["interactive"],
      tools: [
        "Multimedia",
        "LED Mapping",
        "Quantum Physics",
        "Science Communication",
        "Interactive Installation",
      ],
    },
    {
      id: "on-my-radar",
      title: "What's on my radar?",
      year: "2026",
      description:
        "An atmospheric interface that listens for subtle wonders and observations from nature, exploring memory and thought structures.",
      thumbnail: "./assets/images/thumbnails/on-my-radar.png",
      url: "./project-pages/on-my-radar.html",
      categories: ["aiweb"],
      tools: ["Atmospheric Interaction", "Spatial Interface", "Memories"],
    },
    {
      id: "move-a-bit",
      title: "Move a Bit",
      year: "2022",
      description:
        '<span class="project-title-italics">Move a Bit</span> features a live motion capture experience bringing quantum computing to life through an interactive display that visually showcases entanglement.',
      thumbnail: "./assets/images/thumbnails/move-a-bit.jpg",
      url: "./project-pages/move-a-bit.html",
      categories: ["interactive", "research"],
      tools: [
        "Quantum Computing",
        "Motion Capture",
        "Interactive Installation",
        "Science Communication",
      ],
    },
    {
      id: "Limen",
      title: "Limen",
      class: "research",
      year: "2026",
      description:
        '<span class="project-title-italics">Limen</span> is a device that enhances your connection with your surroundings by giving you multisensory prompts that help you draw parallels and find patterns',
      thumbnail: "./assets/images/thumbnails/limen-tool.png",
      url: "./project-pages/limen.html",
      categories: ["aiweb"],
      tools: ["Multisensory", "AI Object", "Spatial Interaction"],
    },
    {
      id: "postcards-between-worlds",
      title: "Postcards Between Worlds",
      year: "2023",
      description:
        "A story of two people in the future who send postcards to each other because societal systems have created physical barriers between them.",
      thumbnail: "./assets/images/thumbnails/postcards-between-worlds.png",
      url: "./project-pages/postcards-between-worlds.html",
      categories: ["narrative"],
      tools: ["3D Environments", "Speculative Futures", "Writing"],
    },
    {
      id: "computerized-memories",
      title: "Computerized Memories",
      year: "2023",
      description:
        '<span class="project-title-italics">Computerized Memories</span> explores the biological structure and psychological character of memory.',
      thumbnail: "./assets/images/thumbnails/computerized-memories.jpg",
      url: "./project-pages/computerized-memories.html",
      categories: ["narrative"],
      tools: [
        "3D Environments",
        "Procedural Shaders",
        "Memories",
        "Research Communication",
      ],
    },
    {
      id: "sights-and-insights",
      title: "Sights and Insights",
      year: "2025",
      description:
        '<span class="project-title-italics">Sights and Insights</span> is a voice-based AI web application that transforms ordinary journeys into ones filled with curious interventions.',
      thumbnail: "./assets/images/thumbnails/sights-insights.png",
      url: "./project-pages/sights-insights.html",
      categories: ["aiweb", "research"],
      tools: [
        "Human-Machine-Nature Interaction",
        "Live camera feed",
        "Image Analysis",
        "Speech Synthesis",
        "Multimodal AI",
      ],
    },

    {
      id: "granny-bytes",
      title: "Granny Bytes",
      class: "research",
      year: "2024",
      description:
        '<span class="project-title-italics">Granny Bytes</span> is an AI application that explores intergenerational connections and how they can manifest within our interactions with technology.',
      thumbnail: "./assets/images/thumbnails/granny-bytes.png",
      url: "./project-pages/granny-bytes.html",
      categories: ["aiweb"],
      tools: [
        "Cultural Technology",
        "Conversational UI",
        "Image Analysis",
        "Multimodal AI",
      ],
    },
    {
      id: "firefly-symphony",
      title: "Firefly Symphony",
      year: "2025",
      description: "What would a festival for fireflies be?",
      thumbnail: "./assets/images/thumbnails/firefly-symphony.png",
      url: "./project-pages/a-firefly-symphony.html",
      categories: ["others"],
      tools: [
        "Design Thinking",
        "Speculative",
        "Multimedia",
        "3D Modelling",
        "Interactive Environments",
      ],
    },
    // {
    //   id: "warped-memories",
    //   title: "Warped Memories",
    //   year: "2023",
    //   description:
    //     "This speculative environment draws a poetic parallel between human memories and browser cookies, inviting participants into a data store where personal memories become uniquely flavored cookies.",
    //   thumbnail: "./assets/images/thumbnails/warped-memories.png",
    //   url: "./project-pages/warped-memories-of-digital-ghosts.html",
    //   categories: ["narrative"],
    //   tools: [
    //     "Speculative",
    //     "3D Modelling",
    //     "Materials and Textures",
    //     "Interactive Environments",
    //   ],
    // },
    // {
    //   id: "intermittent",
    //   title: "Intermittent",
    //   year: "2023",
    //   description:
    //     "How can we capture the intermittent phases between Light and Darkness through making an image generation model?",
    //   thumbnail: "./assets/images/thumbnails/intermittent.png",
    //   url: "./project-pages/intermittent.html",
    //   categories: ["aiweb"],
    //   tools: ["StyleGANs", "Image Generation", "Text Generation", "Graphics"],
    // },
    {
      id: "hivemind",
      title: "Hivemind",
      year: "2023",
      description: "A game about understanding emergent behaviour.",
      thumbnail: "./assets/images/thumbnails/hivemind.png",
      url: "./project-pages/hivemind.html",
      categories: ["others"],
      tools: ["Collaborative", "Multiplayer", "Conversational Gameplay"],
    },
    {
      id: "temperature-of-emotions",
      title: "Temperature of Emotions",
      year: "2022",
      description:
        "A speculative device that measures external temperature and gives a corresponding response in the form of different color mappings representing varied emotions.",
      thumbnail: "./assets/images/thumbnails/temperaure-of-emotions.png",
      url: "./project-pages/temperature-of-emotions.html",
      categories: ["others"],
      tools: [
        "Speculative Device",
        "Physical Computing",
        "Research Communication",
      ],
    },
    // {
    //   id: "audiovisual",
    //   title: "Audiovisual",
    //   year: "2023",
    //   description:
    //     "Audio-reactive visuals with dynamic particle systems that respond in real-time to the kicks and snares in the song.",
    //   thumbnail: "./assets/images/thumbnails/audiovisual.jpg",
    //   url: "./project-pages/audiovisual.html",
    //   categories: ["others"],
    //   tools: ["Sound reactive", "Generative visuals", "Particle systems"],
    // },
    // {
    //   id: "echoes",
    //   title: "Echoes",
    //   year: "2023",
    //   description: "A visual narrative on alternate parallel realities.",
    //   thumbnail: "./assets/images/thumbnails/echoes.jpg",
    //   url: "./project-pages/echoes.html",
    //   categories: ["others"],
    //   tools: ["Interactive Type", "Procedural Noise", "Storytelling"],
    // },

    // {
    //   id: "Moving Light",
    //   title: "Moving Light",
    //   year: "2024",
    //   description:
    //     "Following movement of light and how it interacts within a built environment.",
    //   thumbnail: "./assets/images/thumbnails/moving-light.png",
    //   url: "./project-pages/moving-light.html",
    //   categories: ["others"],
    //   tools: ["Projection Mapping", "Glitch", "Sensor based Projection"],
    // },
  ],

  /**
   * Get all unique categories from projects
   */
  getCategories() {
    const categories = new Set();
    this.projects.forEach((project) => {
      project.categories.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories);
  },

  /**
   * Get filter button configuration
   */
  getFilterButtons() {
    return [
      { filter: "all", label: "All Projects" },
      { filter: "aiweb", label: "AI Applications" },
      { filter: "interactive", label: "Installations" },
      { filter: "narrative", label: "3D Environments" },
      { filter: "others", label: "Others" },
    ];
  },

  /**
   * Render a single project card
   */
  renderProject(project) {
    const categoriesClass = project.categories.join(" ");
    const projectClass = project.class ? project.class : "";
    const toolsHTML = project.tools
      .map((tool) => `<li class="project-tag">${tool}</li>`)
      .join(" ");

    return `
      <a
        class="container ${categoriesClass} ${projectClass}"
        href="${project.url}"
        aria-label="View ${project.title} project"
      >
        <span class="arrow-link" aria-hidden="true">&nearr;</span>
        <div class="project-header">
          <div class="project-title">
            ${project.title}
            <span class="project-year">${project.year}</span>
          </div>
        </div>
        <div class="thumbnail">
          <img
            src="${project.thumbnail}"
            alt="Thumbnail image of ${project.title} project"
            loading="lazy"
            decoding="async"
            fetchpriority="${project.id === "machine-stranger" || project.id === "fleeting-states" ? "high" : "auto"}"
          />
        </div>
        <p class="project-description">${project.description}</p>
        <ul class="project-tags" aria-label="Project tags">
          ${toolsHTML}
        </ul>
      </a>
    `;
  },

  /**
   * Render all projects
   */
  renderProjects() {
    const projectsSection = document.getElementById("projects-section");
    if (!projectsSection) return;

    const projectsHTML = this.projects
      .map((project) => this.renderProject(project))
      .join("");
    projectsSection.innerHTML = projectsHTML;
  },

  /* Render filter buttons*/
  renderFilterButtons() {
    const filterBtnsContainer = document.getElementById("filterBtns");
    if (!filterBtnsContainer) return;

    const buttons = this.getFilterButtons();
    const buttonsHTML = buttons
      .map((btn, index) => {
        const isActive = index === 0 ? "active" : "";
        const ariaPressed = index === 0 ? "true" : "false";
        return `
        <button
          class="btn ${isActive}"
          data-filter="${btn.filter}"
          aria-pressed="${ariaPressed}"
          aria-label="${btn.filter === "all" ? "Show all projects" : `Filter by ${btn.label} projects`}"
        >
          ${btn.label}
        </button>
      `;
      })
      .join("");

    filterBtnsContainer.innerHTML = buttonsHTML;
  },
};
