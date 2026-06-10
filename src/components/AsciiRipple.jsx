import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

// Characters ordered by visual density (light → heavy)
const CHARS = ' ·.:+*#@'
const CELL = 22 // px per grid cell

const AsciiRipple = forwardRef(function AsciiRipple({ className }, ref) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    ripples: [],           // { x, y, t }
    cursor: { x: -9999, y: -9999 },
  })

  useImperativeHandle(ref, () => ({
    addRipple(x, y) {
      stateRef.current.ripples.push({ x, y, t: performance.now() / 1000 })
    },
    moveCursor(x, y) {
      stateRef.current.cursor = { x, y }
    },
    clearCursor() {
      stateRef.current.cursor = { x: -9999, y: -9999 }
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (ts) => {
      const t = ts / 1000
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)
      ctx.font = `${Math.round(CELL * 0.62)}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Drop ripples older than 2.8s
      stateRef.current.ripples = stateRef.current.ripples.filter(r => t - r.t < 2.8)

      const cols = Math.ceil(W / CELL) + 1
      const rows = Math.ceil(H / CELL) + 1
      const { cursor } = stateRef.current

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = (col + 0.5) * CELL
          const cy = (row + 0.5) * CELL

          // Gentle ambient breathing — keeps the grid alive when idle
          const ambient =
            Math.sin(col * 0.45 + t * 0.35) *
            Math.sin(row * 0.38 + t * 0.28) *
            0.06

          // Sine wave ripples — each creates a ring that expands + fades
          let ripple = 0
          for (const r of stateRef.current.ripples) {
            const dx = cx - r.x
            const dy = cy - r.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const age = t - r.t
            // wave number 0.11 → ~57px wavelength; angular freq 7.5 → fast travel
            ripple +=
              Math.sin(dist * 0.11 - age * 7.5) *
              Math.exp(-age * 1.3) *         // fade over time
              Math.exp(-dist * 0.011)        // attenuate with distance
          }

          const intensity = Math.max(-1, Math.min(1, ambient + ripple))

          // Cursor proximity glow (0–1 within 130px)
          const cdx = cx - cursor.x
          const cdy = cy - cursor.y
          const cursorDist = Math.sqrt(cdx * cdx + cdy * cdy)
          const cursorGlow = Math.max(0, 1 - cursorDist / 130)

          // Character based on intensity (-1 → 1 mapped across CHARS)
          const idx = Math.max(
            0,
            Math.min(
              CHARS.length - 1,
              Math.floor(((intensity + 1) / 2) * (CHARS.length - 1))
            )
          )
          const char = CHARS[idx]
          if (char === ' ') continue

          // Alpha: dim at rest, bright at intensity peaks + cursor
          const baseAlpha = 0.1 + Math.abs(intensity) * 0.6
          const alpha = Math.min(0.92, baseAlpha + cursorGlow * 0.55)

          // Color: blend slate-400 (148,163,184) → cyan-400 (34,211,238)
          const cyanBlend = Math.max(cursorGlow, Math.max(0, intensity) * 0.55)
          if (cyanBlend > 0.04) {
            const r = Math.round(148 + (34 - 148) * cyanBlend)
            const g = Math.round(163 + (211 - 163) * cyanBlend)
            const b = Math.round(184 + (238 - 184) * cyanBlend)
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
          } else {
            ctx.fillStyle = `rgba(148,163,184,${alpha})`
          }

          ctx.fillText(char, cx, cy)
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
})

export default AsciiRipple
