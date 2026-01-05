import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';
import project7 from '@/assets/project-7.png';

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
    title: 'Movie App – Movie Browsing Website',
    description: 'A movie browsing web application that displays movie information in a clean and user-friendly interface, focusing on layout clarity and smooth user interaction.',
    image: project2,
    tech: ['React','TailwindCSS','Appwrite','TMDB API'],
    link: 'https://umamaheswarymilleny.github.io/Movie_App/',
    github: 'https://github.com/UmamaheswaryMilleny/Movie_App'
  },
  {
    id: 3,
    title: 'Memory Card Game',
    description: 'An interactive memory matching game where players flip cards to find matching pairs, focusing on simple gameplay, clear visuals, and smooth user interaction.',
    image: project3,
    tech: ['React'],
    link: 'https://memory-card-game-mu-orpin.vercel.app/',
    github: 'https://github.com/UmamaheswaryMilleny/Memory-card-game'
  },
  {
    id: 4,
    title: 'Tic-Tac-Toe Game',
    description: 'A simple browser-based Tic Tac Toe game featuring interactive gameplay, real-time win detection, and a clean, minimal user interface.',
    image: project4,
    tech: ['React', 'TailwindCSS'],
    link: 'https://tic-tac-toe-one-bay-76.vercel.app/',
    github: 'https://github.com/UmamaheswaryMilleny/Tic-Tac-Toe'
  },
  {
    id: 5,
    title: 'Rockstar Games Clone – Website UI',
    description: 'A responsive clone of the Rockstar Games website focusing on bold visuals, layout accuracy, and smooth interactions',
    image: project5,
    tech: ['HTML', 'CSS','Bootstrap'],
    link: 'https://rockstargames-clone.vercel.app/',
    github: 'https://github.com/UmamaheswaryMilleny/Rockstargames-clone'
  },
    {
    id: 6,
    title: 'Uber Clone – Landing Page UI',
    description: 'A static clone of the Uber landing page designed to replicate the original layout and visual style,',
    image: project6,
    tech: ['HTML', 'CSS'],
    link: 'https://uber-clone-five-lemon.vercel.app/',
    github: 'https://github.com/UmamaheswaryMilleny/Uber-Clone'
  },
    {
    id: 7,
    title: 'Starbucks Clone – Responsive Static Website',
    description: 'A static clone of the Starbucks homepage showcasing clean layout structure',
    image: project7,
    tech: ['HTML', 'CSS'],
    link: 'https://starbucks-clone-lovat.vercel.app/',
    github: 'https://github.com/UmamaheswaryMilleny/Starbucks-Clone'
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
