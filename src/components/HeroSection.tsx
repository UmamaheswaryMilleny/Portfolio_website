import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3
    });

    // Animate headline
    tl.fromTo(headlineRef.current, {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    });

    // Animate subtitle
    tl.fromTo(subtitleRef.current, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');

    // Animate CTA
    tl.fromTo(ctaRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    // Animate floating orbs
    gsap.to('.hero-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });
    return () => {
      tl.kill();
    };
  }, []);
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      {/* Floating orbs */}
      <div className="hero-orb glow-orb w-72 h-72 -top-20 -left-20 opacity-40" />
      <div className="hero-orb glow-orb w-96 h-96 top-1/3 -right-32 opacity-30" />
      <div className="hero-orb glow-orb w-48 h-48 bottom-20 left-1/4 opacity-50" style={{
      background: 'radial-gradient(circle, hsla(260, 80%, 65%, 0.3) 0%, transparent 70%)'
    }} />

      {/* Spline 3D Background */}
      <div className="absolute inset-0 spline-container opacity-80">
        <iframe src='https://my.spline.design/orb-uAYYi63231cziYSeSQmnaJYT/' frameBorder='0' width='100%' height='100%' title="3D Orb" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Available for Work</span>
          </div>

          {/* Main headline */}
          <h1 ref={headlineRef} className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:text-3xl">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-glow bg-glow-gradient bg-clip-text text-transparent">
              Umamaheswary Milleny
            </span>
            <br />
            <span className="text-foreground">Web Developer</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-light md:text-base">
        I build clean, responsive, and user-focused MERN stack applications. Turning ideas into functional, visually clean experiences.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToProjects} className="btn-glow group text-xs">
              <span className="relative z-10 flex items-center gap-2 font-semibold text-sm">
                View My Work
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
            <a href="#contact" onClick={e => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({
              behavior: 'smooth'
            });
          }} className="px-6 py-3 rounded-xl font-medium text-foreground border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce gap-[8px]">
          <span className="text-xs text-muted-foreground font-medium">Scroll</span>
          <ArrowDown size={16} className="text-primary" />
        </div> */}
      </div>
    </section>;
};
export default HeroSection;