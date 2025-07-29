'use client';

import Image from 'next/image';
import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [mounted, setMounted] = useState(false);
  const navFlowRef = useRef<HTMLDivElement>(null);
  const dataStreamRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const createDataParticles = useCallback(() => {
    if (!dataStreamRef.current || !mounted) return;
    const container = dataStreamRef.current;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'data-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = '0';
      const duration = 3 + Math.random() * 2;
      particle.style.animation = `moveDown ${duration}s linear`;
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle && particle.parentNode === container) {
          particle.remove();
        }
      }, duration * 1000);
    };

    const animate = () => {
      createParticle();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted]);

  const handleNavClick = useCallback((e: MouseEvent, targetId: string) => {
    if (!navFlowRef.current || !mounted) return;
    const container = navFlowRef.current;
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    const targetRect = target.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'nav-particle';
      const progress = i / 19;
      const x = startX + (endX - startX) * progress;
      const y = startY + (endY - startY) * progress;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.animation = `flowToTarget 0.5s ease ${i * 0.02}s forwards`;
      
      container.appendChild(particle);
      setTimeout(() => {
        if (particle && particle.parentNode === container) {
          particle.remove();
        }
      }, 1000);
    }

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const cleanup = createDataParticles();

    const navButtons = document.querySelectorAll('a[href^="#"]');
    const clickHandlers = new Map();

    navButtons.forEach(button => {
      const handler = (e: Event) => {
        const targetId = button.getAttribute('href')?.slice(1);
        if (targetId) {
          handleNavClick(e as unknown as MouseEvent, targetId);
        }
      };
      clickHandlers.set(button, handler);
      button.addEventListener('click', handler);
    });

    return () => {
      cleanup?.();
      navButtons.forEach(button => {
        const handler = clickHandlers.get(button);
        if (handler) {
          button.removeEventListener('click', handler);
        }
      });
    };
  }, [createDataParticles, handleNavClick, mounted]);

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* SVG Definitions */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <clipPath id="wave-path">
            <path d="M0,0 C50,0 50,4 100,4 L100,8 C50,8 50,4 0,4 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background elements */}
      <div className="ai-background" />
      <div className="neural-grid" />
      <div ref={dataStreamRef} className="data-stream" />
      <div ref={navFlowRef} className="nav-flow" />
      
      {/* Golden Flash Effect */}
      <div className="golden-flash-container">
        <div className="golden-flash" />
        <div className="golden-flash" />
        <div className="golden-flash" />
      </div>

      {/* Hero Section */}
      <AnimatePresence mode="wait">
        <motion.section 
          key="hero-section"
          className="relative min-h-[100vh] flex items-center justify-center px-4 pt-8 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              key="content-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="relative text-5xl md:text-7xl font-bold text-center">
                <span className="border-bottom-animated">
                  <span className="typewriter-container">
                    <span className="typewriter-text dr">Dr</span>
                    <span className="typewriter-text dot">.</span>
                    <span className="typewriter-text sk">SK</span>
                    <span className="typewriter-cursor"></span>
                  </span>
                  <motion.div
                    key={mounted ? 'mounted' : 'unmounted'}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ 
                      duration: 2, 
                      ease: [0.4, 0, 0.2, 1],
                      delay: 2.5,
                      opacity: { duration: 0.8, delay: 2.5 }
                    }}
                    className="absolute -bottom-4 -left-[20%] w-[140%] h-[4px] bg-gradient-to-r from-transparent via-blue-500/80 via-purple-500/80 to-transparent"
                    style={{ 
                      transformOrigin: "left",
                      boxShadow: "0 0 40px rgba(37,99,235,0.6), 0 0 80px rgba(147,51,234,0.4)"
                    }}
                  />
                  <div className="wave-animation" />
                </span>
              </h1>

              <div className="title-container">
                <motion.p
                  key="title-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5, duration: 0.8 }}
                  className="subtitle text-2xl md:text-3xl text-gray-200 font-semibold"
                >
                  Sr. Software Engineer
                </motion.p>
                <motion.div
                  key="title-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.8, duration: 0.8 }}
                  className="space-y-3 text-gray-300"
                >
                  <p className="subtitle font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Cybersecurity and AI Consultant
                  </p>
                  <p className="subtitle font-medium pb-8">Author</p>
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
        </motion.section>
      </AnimatePresence>

      {/* Section Connector */}
      <div className="section-connector">
        <div className="connector-line" />
        <div className="connector-dot top" />
        <div className="connector-dot bottom" />
      </div>

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

      {/* Section Connector */}
      <div className="section-connector">
        <div className="connector-line" />
        <div className="connector-dot top" />
        <div className="connector-dot bottom" />
      </div>

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

      {/* Section Connector */}
      <div className="section-connector">
        <div className="connector-line" />
        <div className="connector-dot top" />
        <div className="connector-dot bottom" />
      </div>

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

      {/* Section Connector */}
      <div className="section-connector">
        <div className="connector-line" />
        <div className="connector-dot top" />
        <div className="connector-dot bottom" />
      </div>

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

      {/* Section Connector */}
      <div className="section-connector">
        <div className="connector-line" />
        <div className="connector-dot top" />
        <div className="connector-dot bottom" />
      </div>

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
