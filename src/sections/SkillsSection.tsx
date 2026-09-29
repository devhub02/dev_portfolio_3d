import FadeIn from '../components/FadeIn';
import { skillGroups } from '../data';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {skillGroups.map((g, i) => (
          <FadeIn key={g.title} delay={i * 0.1}>
            <div className="h-full rounded-[32px] border-2 border-[#D7E2EA] p-6 sm:p-8">
              <h3
                className="text-[#D7E2EA] font-medium uppercase mb-5"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}
              >
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-[#D7E2EA]/40 px-4 py-1.5 text-[#D7E2EA] font-light text-sm sm:text-base"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
