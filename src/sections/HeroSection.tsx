import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import EyeTrackingPortrait from '../components/EyeTrackingPortrait';
import ContactButton from '../components/ContactButton';
import { heroTagline, profile } from '../data';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: `mailto:${profile.email}` },
];

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col h-screen"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8 relative z-20">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="overflow-hidden px-6 md:px-10">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[8vw] sm:text-[8.5vw] md:text-[9.5vw] lg:text-[10.5vw] mt-6 sm:mt-4 md:-mt-5 text-center">
            Hi, i&apos;m devendra
          </h1>
        </FadeIn>
      </div>

      <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {heroTagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton href={`mailto:${profile.email}`} />
        </FadeIn>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <EyeTrackingPortrait
              alt={`${profile.fullName} portrait`}
              className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px]"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
