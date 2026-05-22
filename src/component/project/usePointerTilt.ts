'use client';

import { useCallback } from 'react';
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

type TiltResult = {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  glareX: MotionValue<number>;
  glareY: MotionValue<number>;
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
};

export function usePointerTilt(maxTilt = 10): TiltResult {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 28, mass: 0.6 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { rotateX, rotateY, glareX, glareY, onPointerMove, onPointerLeave };
}
