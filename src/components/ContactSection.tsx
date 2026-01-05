import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from 'emailjs-com';
gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo('.contact-title',
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

    // Info cards animation
    gsap.fromTo('.contact-info-item',
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Form animation
    gsap.fromTo('.contact-form',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Form inputs stagger
    gsap.fromTo('.form-field',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!formRef.current) return;

  setIsSubmitting(true);

  // Button animation
  gsap.to('.submit-btn', {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });

  try {
    await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID!,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
    );

    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    formRef.current.reset();
  } catch (error) {
    console.error(error);

    toast({
      title: 'Failed to send message',
      description: 'Something went wrong. Please try again later.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'umamaheswarymillini@gmail.com', href: 'mailto:umamaheswarymillini@gmail.com' },
    // { icon: Phone, label: 'Phone', value: '+91 7994408936', href: 'tel:+917994408936' },
    { icon: MapPin, label: 'Location', value: 'Kochi, Kerala, India', href: 'https://www.google.com/maps/search/?api=1&query=Kochi,Kerala,India' },
  ];

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/UmamaheswaryMilleny' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/umamaheswary-milleny' },
    { icon: FaXTwitter, label: 'Twitter', href: 'https://x.com/UMilleny' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="glow-orb w-80 h-80 bottom-0 right-0 opacity-25" />
      <div className="glow-orb w-64 h-64 top-20 left-0 opacity-20"
           style={{ background: 'radial-gradient(circle, hsla(260, 80%, 65%, 0.3) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="contact-title text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Let's Talk</span>
          <h2 className="section-title mt-4">Get In Touch</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Contact Info</h3>
              
              {contactInfo.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="contact-info-item glass-card-hover p-5 flex items-center gap-4 group"
                >
                  <div className="skill-icon !w-12 !h-12 flex-shrink-0">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Connect with me</h4>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-icon group"
                    aria-label={social.label}
                  >
                    <social.icon size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form glass-card p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-2">Send Message</h3>

            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="glass-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="glass-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="glass-input"
                placeholder="Project inquiry"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="glass-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn btn-glow w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
