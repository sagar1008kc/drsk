'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProgressBar } from 'primereact/progressbar';

const certifications = [
  { name: 'Google Cloud Architect', icon: '/googleIcon.png' },
  { name: 'Azure Developer', icon: '/developerIcon.png' },
  { name: 'Azure DevOps Engineer', icon: '/devOpsIcon.jpg' },
  { name: 'CompTIA Security+', icon: '/securityIcon.png' },
  { name: 'CompTIA CySA+', icon: '/cysaIcon.png' },
  { name: 'CompTIA Security Analyst Professional', icon: '/csapIcon.png' },
  { name: 'Certified AI Scientist', icon: '/CAIS.png' },
];

const skillCategories = {
  technical: [
    'Frontend Development (React 18, Next.js 14, TypeScript 5)',
    'State Management (Redux Toolkit, RTK Query, Context API)',
    'UI Frameworks (Material-UI v5, PrimeReact, Tailwind CSS)',
    'Modern React Patterns (Server/Client Components, Hooks, Suspense)',
    'Backend Development (Spring Boot 3, Node.js, Express)',
    'API Development (REST, GraphQL, WebSocket, gRPC)',
    'Database Technologies (PostgreSQL, MongoDB, Redis, Cosmos DB)',
    'Testing (Jest, React Testing Library, Cypress, JUnit)',
    'Build Tools & Bundlers (Webpack, Vite, Babel, ESBuild)',
    'Mobile Development (React Native, Progressive Web Apps)',
    'Performance Optimization (Code Splitting, Lazy Loading, Caching)',
    'Web Standards (HTML5, CSS3, ES6+, Web APIs, Accessibility)'
  ],
  sdlc: [
    'Agile & Scrum (Sprint Planning, Daily Stand-ups, Retrospectives)',
    'DevOps Practices (CI/CD, Infrastructure as Code, Monitoring)',
    'Version Control (Git Flow, Trunk-Based Development, Code Reviews)',
    'Quality Assurance (Test Plans, Automation, Performance Testing)',
    'System Design (Microservices, Event-Driven Architecture, DDD)',
    'Technical Documentation (API Specs, Architecture Diagrams)',
    'Release Management (Feature Flags, Canary Deployments)',
    'Project Tracking (Jira, Azure DevOps, GitHub Projects)',
    'Code Quality (SonarQube, ESLint, Prettier, Husky)',
    'Estimation & Planning (Story Points, Capacity Planning)',
    'Risk Management (Impact Analysis, Mitigation Strategies)',
    'Team Collaboration (Code Reviews, Knowledge Sharing Sessions)'
  ],
  cybersecurity: [
    'Application Security (OWASP Top 10, Security Headers)',
    'Identity Management (OAuth 2.0, JWT, SSO, MFA)',
    'Compliance Standards (HIPAA, SOC2, ISO27001, GDPR)',
    'Security Testing (Penetration Testing, Vulnerability Scanning)',
    'Cloud Security (Azure Security Center, GCP Security Command)',
    'Network Security (Firewalls, VPNs, SSL/TLS)',
    'Data Protection (Encryption, Data Masking, Key Management)',
    'Access Control (RBAC, ABAC, Least Privilege)',
    'Security Monitoring (SIEM, Log Analysis, Alerts)',
    'Incident Response (Playbooks, Recovery Plans)',
    'Security Architecture (Zero Trust, Defense in Depth)',
    'Security Training (Awareness Programs, Best Practices)'
  ],
  cloud: [
    'Azure Services (App Service, Functions, AKS, CosmosDB)',
    'GCP Services (Cloud Run, GKE, Cloud Storage, BigQuery)',
    'Infrastructure as Code (Terraform, ARM Templates)',
    'Containerization (Docker, Kubernetes, Helm Charts)',
    'Serverless Computing (Azure Functions, Cloud Run)',
    'Cloud Networking (VNets, Load Balancers, CDN)',
    'Monitoring & Logging (App Insights, Cloud Monitoring)',
    'Database Services (Azure SQL, Cloud SQL, Managed Redis)',
    'Message Queues (Service Bus, Pub/Sub, Event Grid)',
    'CI/CD (Azure Pipelines, Cloud Build, GitHub Actions)',
    'Cost Management (Resource Optimization, Budgeting)',
    'Disaster Recovery (Backup, Geo-replication, Failover)'
  ],
  ai: [
    'AI Development Tools (GitHub Copilot, Cursor.sh)',
    'Prompt Engineering (ChatGPT, Claude, Anthropic)',
    'AI-Powered Code Review & Refactoring',
    'AI Integration in Development Workflow',
    'LLM API Integration (OpenAI, Anthropic, Gemini)',
    'AI-Assisted Testing & Documentation',
    'Automated Code Generation & Optimization',
    'AI Development Best Practices & Ethics'
  ],
  leadership: [
    'Technical Team Leadership (10+ Member Teams)',
    'Architecture & Design Decision Making',
    'Cross-functional Team Collaboration',
    'Project Planning & Resource Allocation',
    'Stakeholder Communication & Management',
    'Technical Mentoring & Knowledge Sharing',
    'Performance Reviews & Career Development',
    'Process Improvement & Team Efficiency',
    'Vendor Evaluation & Management',
    'Budget Planning & Resource Optimization',
    'Strategic Technology Planning',
    'Team Building & Culture Development'
  ]
};

export default function Home() {
  useEffect(() => {
    // Create flashes
    const createFlashes = () => {
      const container = document.querySelector('.flash-layer');
      if (!container) return;
      container.innerHTML = '';
      for (let i = 0; i < 12; i++) { // Increased number of flashes
        const flash = document.createElement('div');
        flash.className = 'flash';
        flash.style.left = `${Math.random() * 100}%`;
        flash.style.top = `${Math.random() * 100}%`;
        flash.style.width = `${Math.random() * 200 + 100}px`;
        flash.style.height = flash.style.width;
        flash.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(flash);
      }
    };

    // Create light streaks
    const createStreaks = () => {
      const container = document.querySelector('.flash-layer');
      if (!container) return;
      for (let i = 0; i < 15; i++) { // Increased number of streaks
        const streak = document.createElement('div');
        streak.className = 'light-streak';
        streak.style.top = `${Math.random() * 100}%`;
        streak.style.left = `${Math.random() * 100}%`;
        streak.style.width = `${Math.random() * 150 + 100}px`; // Increased width
        streak.style.transform = `rotate(${Math.random() * 360}deg)`;
        streak.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(streak);
      }
    };

    // Create floating orbs
    const createOrbs = () => {
      const container = document.querySelector('.flash-layer');
      if (!container) return;
      for (let i = 0; i < 8; i++) { // Increased number of orbs
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.width = `${Math.random() * 120 + 60}px`; // Increased size
        orb.style.height = orb.style.width;
        orb.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(orb);
      }
    };

    // Create nodes with enhanced effects
    const createNodes = () => {
      const container = document.querySelector('.node-points');
      if (!container) return;
      container.innerHTML = '';
      for (let i = 0; i < 25; i++) { // Increased number of nodes
        const node = document.createElement('div');
        node.className = 'node-point';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(node);

        if (i > 0 && Math.random() > 0.4) { // Increased connection probability
          const line = document.createElement('div');
          line.className = 'connection-line';
          line.style.width = `${Math.random() * 150 + 50}px`; // Varied line lengths
          line.style.top = `${Math.random() * 100}%`;
          line.style.left = `${Math.random() * 100}%`;
          line.style.transform = `rotate(${Math.random() * 360}deg)`;
          line.style.animationDelay = `${Math.random() * 3}s`;
          container.appendChild(line);
        }
      }
    };

    // Initialize all effects
    const initEffects = () => {
      createFlashes();
      createStreaks();
      createOrbs();
      createNodes();
    };

    initEffects();
    window.addEventListener('resize', initEffects);

    return () => {
      window.removeEventListener('resize', initEffects);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background elements */}
      <div className="circuit-grid" />
      <div className="node-points" />

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center px-4 pt-8 pb-16">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="relative text-5xl md:text-7xl font-bold mb-6">
              <span className="absolute top-0 left-0 w-full h-full bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x blur-sm">
                Dr. SK
              </span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
                Dr. SK
              </span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-sm animate-pulse"></span>
            </h1>

            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50 animate-pulse"></div>
              <div className="relative h-full rounded-full overflow-hidden ring-4 ring-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                <Image
                  src="/sk.png"
                  alt="Dr. SK"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  priority
                  quality={90}
                />
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl md:text-3xl text-gray-200 font-semibold"
              >
                Sr. Software Engineer
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-3 text-gray-300"
              >
                <p className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Cybersecurity and AI Consultant
                </p>
                <p className="font-medium">Author</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center items-center gap-2 sm:gap-4"
            >
              <a 
                href="#about" 
                className="px-3 sm:px-6 py-2.5 text-sm sm:text-base bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap"
              >
                About Me
              </a>
              <a 
                href="#certifications" 
                className="px-3 sm:px-6 py-2.5 text-sm sm:text-base bg-purple-600 rounded-full hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20 whitespace-nowrap"
              >
                Education
              </a>
              <a 
                href="#work" 
                className="px-3 sm:px-6 py-2.5 text-sm sm:text-base bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20 whitespace-nowrap"
              >
                Projects
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="relative py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            About Me
          </h2>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl space-y-12">
            {/* Summary */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Summary</h3>
              <p className="text-gray-300 leading-relaxed">
                Senior Software Engineer with 9+ years of expertise in architecting and delivering enterprise-scale applications, 
                combining deep technical knowledge with strategic business insights from my Doctorate in Business Administration (DBA) 
                in Information Systems and Enterprise Resource Management. Demonstrated mastery in full-stack development using 
                modern technologies (React, Next.js, Spring Boot) and cloud platforms (Azure, GCP).
              </p>
              <div className="mt-4 space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-blue-400">Technical Excellence:</span> Proven track record in developing high-performance, 
                  scalable applications using cutting-edge technologies including React 18, Next.js 14, Material UI, Spring Boot, 
                  and cloud-native architectures. Specialized in performance optimization, microservices architecture, and 
                  enterprise system integration.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-blue-400">Security & Compliance:</span> CompTIA Security+ and CYSA+ certified professional 
                  with extensive experience in implementing robust security measures, ensuring regulatory compliance (HIPAA, SOC2), 
                  and establishing secure development practices in enterprise environments.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-blue-400">AI & Innovation:</span> USAII Certified AI Scientist leveraging advanced AI tools 
                  and technologies to enhance development workflows, automate processes, and implement intelligent features in 
                  applications. Expertise in AI integration, prompt engineering, and responsible AI implementation.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-blue-400">Strategic Impact:</span> Uniquely positioned to bridge technical excellence with 
                  business strategy through my DBA research in Information Systems and Enterprise Resource Management. Focused on 
                  delivering solutions that drive organizational efficiency, innovation, and competitive advantage while ensuring 
                  alignment with business objectives and enterprise architecture principles.
                </p>
              </div>
            </div>

            {/* Skills Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skillCategories).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-6 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {category === 'sdlc' ? 'SDLC Process' : category === 'ai' ? 'AI & ML' : category}
                  </h3>
                  <ul className="space-y-2">
                    {skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                        className="text-gray-300 flex items-start"
                      >
                        <span className="text-blue-400 mr-2">•</span>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Education Section */}
      <section id="certifications" className="relative py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Education & Certifications
          </h2>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 backdrop-blur-sm shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-300">Academic Background</h3>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-purple-300">DBA - Information Systems and Enterprise Resource Management</h4>
                  <p className="text-gray-400">California Intercontinental University</p>
                </div>
                <div className="md:text-right text-gray-400">
                  <p>Doctorate in Business Administration</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-purple-300">Master's in Management</h4>
                  <p className="text-gray-400">Tribhuvan University, Nepal</p>
                </div>
                <div className="md:text-right text-gray-400">
                  <p>Master's Degree</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-purple-300">Bachelor's in Mathematics</h4>
                  <p className="text-gray-400">Tribhuvan University, Nepal</p>
                </div>
                <div className="md:text-right text-gray-400">
                  <p>Bachelor's Degree</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-purple-300">Associate of Science in Computer Science</h4>
                  <p className="text-gray-400">Houston Community College, Houston, TX</p>
                </div>
                <div className="md:text-right text-gray-400">
                  <p>Associate Degree</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Professional Certifications */}
          <h3 className="text-2xl font-semibold mb-6 text-center text-blue-300">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="cert-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="cert-image">
                  <Image
                    src={cert.icon}
                    alt={cert.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-center text-lg font-semibold text-gray-200">
                  {cert.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative py-20 px-4 bg-gradient-to-b from-black/50 to-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-blue-900/30 hover:to-purple-900/30 transition-all duration-500"
            >
              <a href="https://www.smindbusiness.com" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <Image
                    src="/smindbusiness.png"
                    alt="SMind Business"
                    fill
                    className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">SMind Business</h3>
                  <p className="text-gray-300 mb-4">
                    A Next.js 14 powered portfolio showcasing my professional journey and technical expertise. 
                    Features a collection of projects, publications, and achievements in software engineering, 
                    cloud architecture, AI development, and cybersecurity.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Next.js 14</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">TypeScript</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Tailwind CSS</span>
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Framer Motion</span>
                  </div>
                  <div className="flex justify-center">
                    <a 
                      href="https://www.smindbusiness.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                      <span className="mr-2">Visit Site</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-blue-900/30 hover:to-purple-900/30 transition-all duration-500"
            >
              <a href="https://www.avianaa.com" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <Image
                    src="/avianaa1.png"
                    alt="Avianaa"
                    fill
                    className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">Avianaa Game App</h3>
                  <p className="text-gray-300 mb-4">Interactive gaming application built with modern web technologies. Features real-time multiplayer functionality, responsive design, and cross-platform compatibility.</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Redux</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Cross-platform</span>
                  </div>
                  <div className="flex justify-center">
                    <a 
                      href="https://www.avianaa.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                      <span className="mr-2">Visit Site</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section id="author" className="relative py-20 px-4 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            About the Author
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative w-64 h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/author.jpg"
                    alt="sk"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <a
                  href="https://www.amazon.com/author/sagar2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  <span className="mr-2">View Author Profile</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <div className="md:w-2/3 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    Dr. SK is an IT professional currently working as Software Engineer at one of the world's top Fortune 500 companies, 
                    with over a decade of experience spanning IT support, Software Development, Cybersecurity, Cloud Computing, and Artificial Intelligence(AI). 
                    With a strong foundation as a former Mathematics Teacher, Section Officer, and Career Trainer in Nepal, Khatri brings a unique blend of 
                    analytical thinking and real-world business insight to every project he undertakes.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed mt-4">
                    He holds the degrees of Associate of Science in Computer Science, Bachelor of Education in Mathematics, and Master of Education. 
                    He is currently completing his Doctorate in Business Administration (DBA), specializing in Information Systems and Enterprise Resource Management. 
                    His research focuses on AI-driven solutions for inventory management and fraud prevention in fuel industry.
                  </p>

                  <p className="text-gray-300 leading-relaxed mt-4">
                    As an author, Khatri is passionate about simplifying complex technical concepts and making them accessible to professionals 
                    seeking to adapt and thrive in the evolving world of IT. His books offer practical insights, interview preparation guides, 
                    and hands-on strategies for anyone navigating today's tech-driven job market.
                  </p>

                  <p className="text-gray-300 leading-relaxed mt-4">
                    In addition to his technical career, Khatri is passionate about motivational speaking and writing books that explore the 
                    philosophy of life, self-love, and personal growth. He also coaches individuals seeking balance and purpose in both personal 
                    and professional spheres. Beyond adult nonfiction, he enjoys creating imaginative and educational children's books that inspire 
                    curiosity, creativity, and character development. His diverse body of work reflects a mission to uplift minds—both young and grown. 
                    His mission is to inspire minds of all ages—through power of knowledge.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Software Engineering</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Cybersecurity</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Cloud Computing</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Artificial Intelligence</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Technical Writing</span>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Education</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Get In Touch
          </h2>
          <p className="text-gray-300 mb-12">
            Interested in collaboration or have a project in mind? Let's discuss how we can work together.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="mailto:info@smindbusiness.com"
              className="glow-effect inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
            >
              Contact Me
            </a>
            <a
              className="libutton"
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=s777k"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
