"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function Reveal({ children, className, delay = 0, direction = "up" }: Props) {
  const ref      = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const initial: Record<typeof direction, string> = {
    up:    "opacity-0 translate-y-8",
    left:  "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    none:  "opacity-0",
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-x-0 translate-y-0" : initial[direction],
        className,
      )}
    >
      {children}
    </div>
  )
}
