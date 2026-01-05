import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile2.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'GSAP', icon: '🎬' },
  { name: 'Three.js', icon: '🔮' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Image animation
    gsap.fromTo(image,
      { opacity: 0, x: -80, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Content animation
    gsap.fromTo(content,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Skills stagger animation
    gsap.fromTo('.skill-item',
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="glow-orb w-80 h-80 top-20 right-0 opacity-20" />
      <div className="glow-orb w-64 h-64 bottom-20 left-10 opacity-30"
           style={{ background: 'radial-gradient(circle, hsla(260, 80%, 65%, 0.3) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Get to know me</span>
          <h2 className="section-title mt-4">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-start p-4">
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden glass-card p-2 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={profileImage} 
                  alt="Umamaheswary Milleny"
                  className="w-full h-full object-cover object-top
 rounded-full"
                />
              </div>

              {/* Decorative ring */}
              <div className="absolute -inset-8 border border-primary/20 rounded-full animate-pulse-glow" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Hi there, I'm Milleny
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I specialize in frontend development, crafting dynamic, visually engaging, 
                and highly responsive websites that provide seamless user experiences. With a 
                strong foundation in HTML, CSS, and JavaScript, I focus on building modern 
                web interfaces that are not only aesthetically appealing but also optimized 
                for performance and accessibility.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My expertise extends to advanced frameworks like React and animation libraries 
                like GSAP, enabling me to create interactive, efficient applications. Whether 
                it's designing sleek UI components, implementing smooth animations, or enhancing 
                user interactions, my goal is to develop web solutions that are both functional 
                and innovative.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Tech Stack</h4>
              <div className="skills-grid grid grid-cols-4 gap-2">
                {skills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="skill-item skill-icon flex-col gap-1 !w-auto !h-auto py-2 px-1.5"
                  >
                    <span className="text-base">{skill.icon}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
