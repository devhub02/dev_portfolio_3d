import { useEffect, useId } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import eyes from '../eyes.json';

const W = 1000;
const H = 1200;
const IRIS_X = 10;
const IRIS_Y = 5.5;
const HEAD_YAW = 20; // deg
const HEAD_PITCH = 13; // deg
const HEAD_SHIFT = 16; // px

type EyeKey = 'l' | 'r';
const keys: EyeKey[] = ['l', 'r'];
const spring = { stiffness: 140, damping: 20, mass: 0.6 };
const eyeSpring = { stiffness: 320, damping: 26, mass: 0.3 };

/**
 * Portrait inside a sphere. The head turns toward the cursor and the irises
 * lead it, so eyes and face move together.
 */
export default function EyeTrackingPortrait({ alt, className }: { alt: string; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const nx = useMotionValue(0); // -1..1 target
  const ny = useMotionValue(0);

  // Head follows slower than the eyes.
  const hx = useSpring(nx, spring);
  const hy = useSpring(ny, spring);
  const ex = useSpring(nx, eyeSpring);
  const ey = useSpring(ny, eyeSpring);

  const rotateY = useTransform(hx, (v) => v * HEAD_YAW);
  const rotateX = useTransform(hy, (v) => -v * HEAD_PITCH);
  const shiftX = useTransform(hx, (v) => v * HEAD_SHIFT);
  const shiftY = useTransform(hy, (v) => v * HEAD_SHIFT * 0.5);
  const irisX = useTransform(ex, (v) => v * IRIS_X);
  const irisY = useTransform(ey, (v) => v * IRIS_Y);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const svg = document.getElementById(`eyes-${uid}`);
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const scale = W / r.width;
      const cx = r.left + ((eyes.l.cx + eyes.r.cx) / 2) / scale;
      const cy = r.top + ((eyes.l.cy + eyes.r.cy) / 2) / scale;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Measure against the room available on each side, so the head and eyes
      // reach full turn as the cursor nears that screen edge, in any direction.
      const roomX = dx < 0 ? cx : window.innerWidth - cx;
      const roomY = dy < 0 ? cy : window.innerHeight - cy;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const tx = clamp(dx / Math.max(roomX * 0.8, 1));
      const ty = clamp(dy / Math.max(roomY * 0.8, 1));
      // Ease so small movements are subtle and large ones turn fully.
      const ease = (v: number) => Math.sign(v) * Math.pow(Math.abs(v), 0.8);
      nx.set(ease(tx));
      ny.set(ease(ty));
    };
    const onLeave = () => {
      nx.set(0);
      ny.set(0);
    };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [nx, ny, uid]);

  const d = Math.round(eyes.l.r * 2 + 2);

  return (
    <div
      className={`relative ${className ?? ''}`}
      style={{
        aspectRatio: `${W} / ${H}`,
        perspective: 800,
        filter: 'drop-shadow(0 0 40px rgba(118,33,176,0.45))',
      }}
    >
      {/* V-shaped bust cut: shoulders taper to a point instead of a hard edge. */}
      <div
        className="absolute inset-0"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 66%, 50% 100%, 0% 66%)' }}
      >
      <motion.div
        className="absolute left-1/2 bottom-0 w-full"
        style={{
          aspectRatio: `${W} / ${H}`,
          x: '-50%',
          translateX: shiftX,
          translateY: shiftY,
          rotateX,
          rotateY,
          transformOrigin: '50% 75%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <img src="/images/hero-base.webp" alt={alt} className="absolute inset-0 w-full h-full select-none" draggable={false} />
        <svg
          id={`eyes-${uid}`}
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <filter id={`soft-${uid}`}>
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
            {keys.map((k) => (
              <clipPath key={k} id={`clip-${k}-${uid}`}>
                <polygon points={eyes[k].open.map((p) => p.join(',')).join(' ')} />
              </clipPath>
            ))}
            <linearGradient id={`lid-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a120a" stopOpacity="0.6" />
              <stop offset="0.45" stopColor="#2a120a" stopOpacity="0.12" />
              <stop offset="1" stopColor="#2a120a" stopOpacity="0" />
            </linearGradient>
            {/* Rounds the eyeball: darker toward the corners so it reads as a sphere. */}
            <radialGradient id={`ball-${uid}`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0.45" stopColor="#3a1a10" stopOpacity="0" />
              <stop offset="1" stopColor="#3a1a10" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          {keys.map((k) => {
            const e = eyes[k];
            return (
              <g key={k} clipPath={`url(#clip-${k}-${uid})`}>
                <motion.g style={{ x: irisX, y: irisY }} filter={`url(#soft-${uid})`}>
                  <image
                    href={`/images/iris-${k}.png`}
                    x={Math.round(e.cx - d / 2)}
                    y={Math.round(e.cy - d / 2)}
                    width={d}
                    height={d}
                  />
                </motion.g>
                <rect x={e.cx - 40} y={e.cy - 15} width={80} height={32} fill={`url(#ball-${uid})`} />
                <rect x={e.cx - 40} y={e.cy - 15} width={80} height={32} fill={`url(#lid-${uid})`} />
              </g>
            );
          })}
        </svg>
      </motion.div>
      </div>
    </div>
  );
}
