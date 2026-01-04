import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

import project1 from '@/assets/project-11.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'MacBook Landing Page',
    description: 'A sleek, interactive landing page inspired by Apple’s product showcase with smooth scroll animations and immersive visuals.',
    image: project1,
    tech: ['React', 'Three.js', 'GSAP'],
    link: 'https://mac-book-landing-three.vercel.app/',
    github: 'https://github.com/UmamaheswaryMilleny/MacBook_Landing'
  },
  {
    id: 2,
    title: 'Gaming UI Platform',
    description: 'Next-level gaming interface with character selection and NFT store.',
    image: project2,
    tech: ['React', 'Tailwind', 'Framer Motion'],
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Modern developer portfolio with immersive 3D elements and animations.',
    image: project3,
    tech: ['React', 'Spline', 'GSAP'],
    link: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'Gaming Website',
    description: 'Creative gaming website with anime-style visuals and interactions.',
    image: project4,
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
    github: '#'
  },
  {
    id: 5,
    title: 'Animation Tools',
    description: 'Top web animation tools showcase with 3D sphere integration.',
    image: project5,
    tech: ['React', 'Tailwind', 'Spline'],
    link: '#',
    github: '#'
  },
  {
    id: 6,
    title: 'Rockstar Games Website Clone',
    description: 'A responsive clone of the Rockstar Games website focusing on bold visuals, layout accuracy, and smooth interactions',
    image: project6,
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://rockstargames-clone.vercel.app/',
    github: 'https://github.com/UmamaheswaryMilleny/Rockstargames-clone'
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    // Section title animation
    gsap.fromTo('.projects-title',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo('.project-card',
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="glow-orb w-96 h-96 top-0 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="projects-title text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Recent Work</span>
          <h2 className="section-title mt-4">My Projects</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A collection of my recent projects showcasing modern web development, 
            3D integration, and creative animations.
          </p>
        </div>

        {/* Projects grid - horizontal scroll on mobile, grid on desktop */}
        <div 
          ref={containerRef}
          className="scroll-container md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card glass-card-hover min-w-[320px] md:min-w-0 flex flex-col overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 backdrop-blur-sm">
                  <a 
                    href={project.link}
                    className="skill-icon !w-12 !h-12"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={20} className="text-primary" />
                  </a>
                  <a 
                    href={project.github}
                    className="skill-icon !w-12 !h-12"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} className="text-primary" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {project.description}
                </p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
