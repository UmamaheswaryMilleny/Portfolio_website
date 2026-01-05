import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { gsap } from 'gsap';
import logo from '@/assets/logo2.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu', {
        x: '100%'
      }, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.fromTo('.mobile-link', {
        x: 50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power2.out'
      });
    }
  }, [isOpen]);
  const navLinks = [{
    name: 'Home',
    href: '#hero'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Projects',
    href: '#projects'
  }, 
  {
      name: 'Achievements', href: '#achievements' 
  },
  {
    name: 'Contact',
    href: '#contact'
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };
  return <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-card !rounded-none py-4' : 'py-1'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={e => {
          e.preventDefault();
          scrollToSection('#hero');
        }} className="font-bold text-foreground hover:text-primary transition-colors">
         <img src={logo} alt="logo" style={{width:160}} />
           
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <button key={link.name} onClick={() => scrollToSection(link.href)} className="nav-link text-sm font-medium">
                {link.name}
              </button>)}
          </div>

          {/* Desktop CTA & Socials */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/UmamaheswaryMilleny" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/umamaheswary-milleny" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <button onClick={() => scrollToSection('#contact')} className="btn-glow px-6 py-2.5 ml-2 text-xs font-semibold">
              <span className="relative z-10">Hire Me</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(true)} className="md:hidden text-foreground p-2">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="mobile-menu absolute top-0 right-0 w-4/5 max-w-sm h-full glass-card !rounded-l-3xl !rounded-r-none p-8">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-foreground">
              <X size={24} />
            </button>

            <div className="flex flex-col gap-8 mt-16">
              {navLinks.map(link => <button key={link.name} onClick={() => scrollToSection(link.href)} className="mobile-link text-2xl font-medium text-foreground hover:text-primary transition-colors text-left">
                  {link.name}
                </button>)}

              <div className="mobile-link flex gap-4 mt-8 pt-8 border-t border-border">
                <a href="https://github.com/UmamaheswaryMilleny" target="_blank" rel="noopener noreferrer" className="skill-icon">
                  <Github size={20} className="text-primary" />
                </a>
                <a href="https://www.linkedin.com/in/umamaheswary-milleny" target="_blank" rel="noopener noreferrer" className="skill-icon">
                  <Linkedin size={20} className="text-primary" />
                </a>
                <a href="https://x.com/UMilleny" target="_blank" rel="noopener noreferrer" className="skill-icon">
                  <Twitter size={20} className="text-primary" />
                </a>
              </div>

              <button onClick={() => scrollToSection('#contact')} className="mobile-link btn-glow text-center mt-4">
                <span className="relative z-10">Hire Me</span>
              </button>
            </div>
          </div>
        </div>}
    </>;
};
export default Navigation;