import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const chars = Array.from(text);
  // Keep words together so line breaks fall between words, not mid-word.
  const words = text.split(' ');
  let idx = 0;
  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((c) => {
            const i = idx++;
            return <Char key={i} char={c} index={i} total={chars.length} progress={scrollYProgress} />;
          })}
          {wi < words.length - 1 && (() => {
            const i = idx++;
            return <Char key={`s${i}`} char={' '} index={i} total={chars.length} progress={scrollYProgress} />;
          })()}
        </span>
      ))}
    </p>
  );
}
