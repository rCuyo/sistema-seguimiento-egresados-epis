"use client"

import { useEffect, useRef } from "react"

export function ViewTracker({ jobId }: { jobId: string }) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    fetch(`/api/jobs/${jobId}/view`, { method: "POST" }).catch(() => {})
  }, [jobId])
  return null
}
