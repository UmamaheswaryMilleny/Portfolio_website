import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Code, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: <Award size={24} />,
    title: "Best Coordinator Award",
    description: "Recognized at Brototype Institute for leadership and organizing peer-learning sessions."
  },
  {
    icon: <Code size={24} />,
    title: "200+ LeetCode Problems Solved",
    description: "Strengthened problem-solving and algorithmic skills through consistent coding practice."
  },
  {
    icon: <Trophy size={24} />,
    title: "Hackathon Participant",
    description: "Actively participated in multiple hackathons, building real-world projects under tight deadlines."
  }
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate title
    gsap.fromTo(".achievements-title", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } }
    );

    // Animate achievement cards
    gsap.fromTo(".achievement-card", 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="relative py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-72 h-72 top-10 right-0 opacity-20" />
      <div className="glow-orb w-64 h-64 bottom-20 left-10 opacity-30" style={{ background: 'radial-gradient(circle, hsla(260, 80%, 65%, 0.3) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 achievements-title">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">My Achievements</span>
          <h2 className="section-title mt-4">Highlights & Accomplishments</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Some milestones I’m proud of, showcasing my dedication, coding practice, and teamwork.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="achievement-card glass-card p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
