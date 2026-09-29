import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { projects } from '../data';
import type { Project } from '../data';

const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const range: [number, number] = [index / total, 1];
  const scale = useTransform(progress, range, [1, targetScale]);
  const [a, b, c] = project.images;

  return (
    <div className="h-[85vh] sticky top-24 md:top-32">
      <motion.div
        className={`border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 relative ${radius}`}
        style={{ background: '#0C0C0C', scale, top: index * 28, transformOrigin: 'top center' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3
                className="text-[#D7E2EA] font-medium uppercase"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4" style={{ width: '40%' }}>
            <img src={a} alt="" loading="lazy" className={`w-full object-cover ${radius}`} style={{ height: 'clamp(130px, 16vw, 230px)' }} />
            <img src={b} alt="" loading="lazy" className={`w-full object-cover ${radius}`} style={{ height: 'clamp(160px, 22vw, 340px)' }} />
          </div>
          <div style={{ width: '60%' }}>
            <img src={c} alt="" loading="lazy" className={`w-full h-full object-cover ${radius}`} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>
      <div ref={container} className="max-w-7xl mx-auto">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
