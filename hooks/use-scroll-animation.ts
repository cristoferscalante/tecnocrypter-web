"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

export function useScrollAnimation(options = { once: true, amount: 0.2 }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, options)

  return { ref, isInView }
}
