import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { profile } from '../data';

const icons: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
};

const pill =
  'inline-flex items-center gap-3 rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors duration-200 hover:bg-[#D7E2EA]/10';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 flex flex-col items-center"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-[#D7E2EA] font-light text-center mb-10 sm:mb-14" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
          {profile.location}
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`mailto:${profile.email}`} className={pill}>
            <Mail size={20} aria-hidden="true" /> Email
          </a>
          {profile.socials.map((s) => {
            const Icon = icons[s.label];
            return (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={pill}>
                <Icon size={20} aria-hidden="true" /> {s.label}
              </a>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
