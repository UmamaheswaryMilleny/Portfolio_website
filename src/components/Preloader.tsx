import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import logo from '@/assets/logo2.png';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      }
    });

    // Fade out logo and progress
    tl.to(".preloader-content", {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.inOut"
    });

    // Reveal animation
    tl.to(".preloader", {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onComplete: onComplete
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-background">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glow-orb w-96 h-96 top-1/4 left-1/4 animate-pulse-glow" />
        <div className="glow-orb w-64 h-64 bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="preloader-content relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            {/* <span className="text-foreground">Milleny</span> */}
              <img src={logo} alt="logo" style={{width:200}} />
          </h1>
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full -z-10" />
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-sm text-muted-foreground">
            <span className="font-light">Loading experience</span>
            <span className="font-medium text-primary">{progress}%</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
