import type { CubicBezierPoints } from '@vueuse/core'
import type { MotionProps } from 'motion-v'
import { cubicBezier } from 'motion-v'

export const easeTransition: CubicBezierPoints = [0.26, 0.02, 0.23, 0.94]
export const defaultEase = cubicBezier(0.26, 0.02, 0.23, 0.94)

export function topAnimation(delay: number = 0) {
  return {
    animate: {
      opacity: 1,
      translateY: '0px',
    },
    initial: {
      opacity: 0,
      translateY: '-20px',
    },
    transition: { duration: 0.8, ease: defaultEase, delay },
  } satisfies MotionProps
}
export function bottomAnimation(delay: number = 0) {
  return {
    animate: {
      opacity: 1,
      translateY: '0px',
    },
    initial: {
      opacity: 0,
      translateY: '20px',
    },
    transition: { duration: 0.8, ease: defaultEase, delay },
  } satisfies MotionProps
}
