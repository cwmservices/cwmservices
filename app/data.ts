export const data = {
    Projects: [
      {
        title: "Digital Mechanic",
        description:
          "Digital Mechanic is a web application created with aim to promote home made food. Developed for FYP which has features from booking mechanic services at your door step to ordering tools and equipments.",
        skills: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "React",
          "Node.js",
          "Tailwind CSS",
          "MongoDB",
          "Express.js",
        ],
        img: "/digitalmechanics.png",
        category: "WEB",
        demo: "https://digitalmechanic.netlify.app",
        sticker: "",
      },
      {
        title: "ACWA (Agriculture, Climate & Water) Portal",
        description:
          "ACWA is a web-based platform that delivers smart solutions and decision-making support for agriculture and rural development through spatial and non-spatial data visualization. I contributed to both backend and frontend development, working on file upload functionality, middleware, authentication and authorization, and database queries. I also built user interfaces for the data management module, including template creation, multi-step dataset uploads, and the solar module. Throughout the project, I actively collaborated with the team in meetings and resolved tasks and issues via Zoho Projects, earning excellent feedback for my work.",
        skills: [
          "Leaflet",
          "AWS",
          "JavaScript",
          "React",
          "Node.js",
          "Express.js",
          "Tailwind CSS",
          "PostgreSQL",
          "Mantine UI",
          "FastAPI"
        ],
        img: "/acwa.png",
        category: "WEB",
        demo: "https://acwaportal.pk",
        sticker: "",
      },
      
      {
        title: "Mitko AI",
        description:
          "Mitko Ai is a full stack application developed for business usecase for one of my client. With innovative idea and industry specific tools such as text generator and Image generator, it is the awesome AI enriched web app.",
        skills: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "React",
          "Node.js",
          "MongoDB",
          "Express.js",
          "Tailwind CSS",
          "Open AI"
        ],
        img: "/mitko.png",
        category: "WEB",
        demo: "https://mitko.netlify.app",
        sticker: "/fiverr.png",
      }
    ],
    Testimonials: [
      {
        id: 1,
        name: "Surendra Singh Deora",
        origin:"/upwork.png",
        country:"https://flagcdn.com/au.svg",
        testimonial:
          "I recently worked with Masood on a project. His technical skills in JavaScript, React, and full stack development are exceptional, which were crucial for our project's success.",
      },
      {
        id: 2,
        name: "Camillo",
        country:"https://flagcdn.com/it.svg",
        origin:"/fiverr.png",
        testimonial:
          "Masood was an exceptionally detailed and skilled developer, he built a whole platform for professional use for us! Higlhy recommended",
      },
      {
        id: 3,
        name: "John Inyang",
        origin:"/fiverr.png",
        country:"https://flagcdn.com/gb.svg",
        testimonial:
          "Fantastic guy. Top understandingly  of expectations and delivered according to plan I would recommend.",
      },
      {
        id: 4,
        name: "Mathew Phelps",
        country:"https://flagcdn.com/se.svg",
        origin:"/fiverr.png",
        testimonial:
          "Hard worker, great communication and price. Recommend.",
      },
      {
        id: 5,
        name: "John",
        origin:"/fiverr.png",
        country:"https://flagcdn.com/us.svg",
        testimonial:
          "Fast Quality Excellent communications. Built an Ecommerce Web App from scratch.",
      },
      {
        id: 6,
        name: "John Inyang",
        country:"https://flagcdn.com/gb.svg",
        origin:"/fiverr.png",
        testimonial:
          "Excellent , top guy. I strongly recommend. Built Testimony Portal.",
      },
    ],
    Members:[
      {
        name:"Krishna",
        title:"Front End Developer",
        location:"India",
        img:"/krishna.png"
      },
      {
        name:"Masood",
        title:"Full Stack Developer",
        location:"Pakistan",
        img:"/cwmlogo.png"
      },
      {
        name:"Kamran",
        title:"Backend Developer",
        location:"Pakistan",
        img:"/kamran.png"
      },
      {
        name:"Sanaullah",
        title:"Wordpress Developer",
        location:"Pakistan",
        img:"/sanaullah.jpg"
      }
    ],
    services : [
  {
    id: "web-development",
    title: "Web Development",
    image: "/webdev.jpg",
    shortDesc: "Building Full Stack Professional and Responsive Websites and Web Applications.",
    longDesc: "We specialize in creating cutting-edge web solutions that drive business growth. Our full-stack development expertise covers everything from interactive front-end interfaces to robust back-end systems. Whether you need a corporate website, e-commerce platform, or custom web application, we deliver scalable, secure, and high-performance solutions tailored to your unique requirements.",
    tagline: "Crafting Digital Experiences That Convert",
    technologies: [
      { name: "React", description: "Building dynamic and interactive user interfaces" },
      { name: "Node.js", description: "Scalable server-side JavaScript runtime" },
      { name: "Tailwind CSS", description: "Modern utility-first CSS framework" },
      { name: "PostgreSQL", description: "Robust relational database management" },
      { name: "Next.js", description: "React framework for production-grade applications" },
      { name: "MongoDB", description: "Flexible NoSQL database solution" },
      { name: "Express", description: "Minimal and flexible Node.js framework" },
      { name: "TypeScript", description: "Type-safe JavaScript development" }
    ]
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    image: "/appdev.jpg",
    shortDesc: "Building Full Stack Android and IOS Mobile Applications.",
    longDesc: "Transform your ideas into powerful mobile experiences. We develop native and cross-platform mobile applications that engage users and deliver exceptional performance. From concept to deployment, our team ensures your app stands out in the crowded app marketplace with intuitive design, seamless functionality, and optimal user experience across all devices.",
    tagline: "Your Ideas, Mobile Reality",
    technologies: [
      { name: "React Native", description: "Cross-platform mobile app development" },
      { name: "Firebase", description: "Backend services and real-time database" },
      { name: "Node.js", description: "Backend API development" },
      { name: "Tailwind", description: "Styling with NativeWind" },
      { name: "Redux", description: "State management for complex apps" },
      { name: "REST APIs", description: "Seamless data integration" },
      { name: "Push Notifications", description: "Engage users with timely updates" },
      { name: "App Store Optimization", description: "Maximize app visibility and downloads" }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    image: "/uiux.jpg",
    shortDesc: "Building UI/UX of Both Web and Mobile Applications.",
    longDesc: "Great design is invisible. We create user interfaces that are not only visually stunning but also intuitive and user-friendly. Our design process focuses on understanding your users' needs and behaviors to craft experiences that delight and convert. From wireframes to high-fidelity prototypes, we ensure every pixel serves a purpose.",
    tagline: "Design That Speaks to Your Users",
    technologies: [
      { name: "Figma", description: "Collaborative interface design tool" },
      { name: "Zeplin", description: "Seamless design handoff to developers" },
      { name: "Adobe XD", description: "Prototyping and design systems" },
      { name: "Sketch", description: "Vector-based design for digital products" },
      { name: "InVision", description: "Interactive prototyping and feedback" },
      { name: "User Research", description: "Data-driven design decisions" },
      { name: "Wireframing", description: "Blueprint for your digital product" },
      { name: "Prototyping", description: "Test before you build" }
    ]
  },
  {
    id: "wordpress",
    title: "WordPress Development",
    image: "/wordpress.jpg",
    shortDesc: "Creating WordPress Websites Ranging From Business Websites To Fully Functioning E-commerce Stores.",
    longDesc: "Leverage the power of WordPress with our expert development services. We build custom WordPress solutions that are easy to manage, SEO-friendly, and conversion-optimized. Whether you need a simple blog, corporate website, or a complete e-commerce store, we provide solutions that empower you to manage your content with ease while maintaining professional quality.",
    tagline: "WordPress Solutions That Grow With You",
    technologies: [
      { name: "Elementor", description: "Drag-and-drop page builder" },
      { name: "WooCommerce", description: "Complete e-commerce solution" },
      { name: "Astra", description: "Fast and customizable theme" },
      { name: "ACF", description: "Advanced custom fields for flexibility" },
      { name: "Yoast SEO", description: "Optimize for search engines" },
      { name: "Custom Themes", description: "Unique designs tailored to your brand" },
      { name: "Plugin Development", description: "Custom functionality for your needs" },
      { name: "WP Security", description: "Protect your website from threats" }
    ]
  },
  {
    id: "ai-integration",
    title: "AI Integration & Agentic Development",
    image: "/ai.jpg",
    shortDesc: "We build and integrate AI Agents for modern web and mobile app systems.",
    longDesc: "Step into the future with AI-powered solutions. We integrate cutting-edge artificial intelligence and machine learning capabilities into your applications to automate workflows, enhance user experiences, and unlock valuable insights from your data. From chatbots to predictive analytics, we help you harness the power of AI to stay ahead of the competition.",
    tagline: "Intelligent Solutions for Tomorrow's Challenges",
    technologies: [
      { name: "OpenAI", description: "GPT models for natural language processing" },
      { name: "Gemini", description: "Google's advanced AI capabilities" },
      { name: "TensorFlow", description: "Machine learning framework" },
      { name: "PyTorch", description: "Deep learning research and production" },
      { name: "n8n", description: "Workflow automation platform" },
      { name: "LangChain", description: "Building AI-powered applications" },
      { name: "Machine Learning", description: "Predictive models and analytics" },
      { name: "Neural Networks", description: "Deep learning architectures" }
    ]
  },
  {
    id: "collaboration",
    title: "Brand Collaboration",
    image: "/collaboration.jpg",
    shortDesc: "Want to promote your brand with actual audience who are actually interested in coding?",
    longDesc: "Expand your reach and connect with a highly engaged tech-savvy audience. We offer collaboration opportunities across multiple platforms to help you promote your brand, products, or services to developers and tech enthusiasts. Our authentic content and established community ensure your message reaches the right people at the right time.",
    tagline: "Connect With Your Target Audience",
    technologies: [
      { name: "YouTube", description: "Video content for developer community" },
      { name: "Medium", description: "Technical articles and tutorials" },
      { name: "Instagram", description: "Visual content and quick tips" },
      { name: "Twitter", description: "Real-time tech updates and discussions" },
      { name: "LinkedIn", description: "Professional network engagement" },
      { name: "Content Marketing", description: "Strategic content creation" },
      { name: "Brand Partnerships", description: "Mutually beneficial collaborations" },
      { name: "Influencer Marketing", description: "Authentic brand advocacy" }
    ]
  }
]
  }


