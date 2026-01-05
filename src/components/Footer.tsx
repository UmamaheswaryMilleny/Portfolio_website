import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Heart ,X} from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '@/assets/logo2.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo('.footer-content',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.3,
        from: 'random'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
  
    { name: 'Projects', href: '#projects' },
       { name: 'Achievements', href: '#achievements' }, 
    { name: 'Contact', href: '#contact' },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/UmamaheswaryMilleny' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/umamaheswary-milleny' },
    { icon: FaXTwitter, href: 'https://x.com/UMilleny' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-border/30">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        <div className="glow-orb w-64 h-64 bottom-0 left-1/2 -translate-x-1/2 opacity-20" />
      </div>

      <div className="footer-content container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
          <img src={logo} alt="logo" style={{width:160}} />
           
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="nav-link text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-icon !w-10 !h-10"
              >
                <social.icon size={18} className="text-muted-foreground hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        {/* <div className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" /> */}

        {/* Copyright */}
        {/* <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © {new Date().getFullYear()}, Made with 
            <Heart size={14} className="text-primary fill-primary" /> 
            by Milleny
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
