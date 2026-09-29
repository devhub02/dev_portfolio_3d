import { useEffect, useId } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import eyes from '../eyes.json';

const W = 1000;
const H = 1200;
const MAX_X = 9;
const MAX_Y = 5;

type EyeKey = 'l' | 'r';

/** Portrait whose irises follow the mouse cursor. */
export default function EyeTrackingPortrait({ alt, className }: { alt: string; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const x = useSpring(tx, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(ty, { stiffness: 220, damping: 22, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const svg = document.getElementById(`eyes-${uid}`);
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      // Cursor relative to the point between the eyes, in image px.
      const scale = W / r.width;
      const cx = r.left + ((eyes.l.cx + eyes.r.cx) / 2) / scale;
      const cy = r.top + ((eyes.l.cy + eyes.r.cy) / 2) / scale;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / 250);
      tx.set((dx / dist) * MAX_X * k);
      ty.set((dy / dist) * MAX_Y * k);
    };
    const onLeave = () => {
      tx.set(0);
      ty.set(0);
    };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [tx, ty, uid]);

  const keys: EyeKey[] = ['l', 'r'];
  const d = Math.round(eyes.l.r * 2 + 2);

  return (
    <div className={`relative ${className ?? ''}`} style={{ aspectRatio: `${W} / ${H}` }}>
      <img src="/images/hero-base.webp" alt={alt} className="absolute inset-0 w-full h-full select-none" draggable={false} />
      <svg
        id={`eyes-${uid}`}
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {keys.map((k) => (
            <clipPath key={k} id={`clip-${k}-${uid}`}>
              <polygon points={eyes[k].open.map((p) => p.join(',')).join(' ')} />
            </clipPath>
          ))}
          <linearGradient id={`lid-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a120a" stopOpacity="0.55" />
            <stop offset="0.4" stopColor="#2a120a" stopOpacity="0.12" />
            <stop offset="1" stopColor="#2a120a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {keys.map((k) => {
          const e = eyes[k];
          return (
            <g key={k} clipPath={`url(#clip-${k}-${uid})`}>
              <motion.g style={{ x, y }}>
                <image
                  href={`/images/iris-${k}.png`}
                  x={Math.round(e.cx - d / 2)}
                  y={Math.round(e.cy - d / 2)}
                  width={d}
                  height={d}
                />
              </motion.g>
              <rect x={e.cx - 40} y={e.cy - 13} width={80} height={26} fill={`url(#lid-${uid})`} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
