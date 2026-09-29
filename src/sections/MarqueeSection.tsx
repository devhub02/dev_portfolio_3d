import { useEffect, useRef, useState } from 'react';
import { marqueeSkills } from '../data';

const half = Math.ceil(marqueeSkills.length / 2);
const row1 = marqueeSkills.slice(0, half);
const row2 = marqueeSkills.slice(half);

function Row({ items, transform }: { items: string[]; transform: string }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="flex gap-3 w-max" style={{ transform, willChange: 'transform' }}>
      {tripled.map((label, i) => (
        <div
          key={i}
          className="rounded-2xl shrink-0 flex items-center justify-center text-center px-6 border border-[#D7E2EA]/25"
          style={{
            width: 420,
            height: 270,
            background: 'linear-gradient(135deg, #16161a 0%, #0C0C0C 100%)',
          }}
        >
          <span className="hero-heading font-black uppercase leading-tight tracking-tight text-4xl">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3"
      style={{ background: '#0C0C0C', overflow: 'hidden' }}
    >
      <Row items={row1} transform={`translateX(${offset - 200}px)`} />
      <Row items={row2} transform={`translateX(${-(offset - 200)}px)`} />
    </section>
  );
}
