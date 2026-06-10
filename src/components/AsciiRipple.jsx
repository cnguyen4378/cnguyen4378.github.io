import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

const CHARS = ' ·.:+*#@'
const CELL = 22

// Ripple travels as a Gaussian ring expanding outward at SPEED px/s.
// Setting omega = k * SPEED ensures ring phase velocity matches the envelope.
const SPEED = 180   // px/s — ring expansion rate
const K = 0.09  // wave number (2π / ~70px wavelength)
const OMEGA = K * SPEED
const SIGMA = 80   // ring spread (px, controls sharpness)

const AsciiRipple = forwardRef(function AsciiRipple({ className }, ref) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    ripples: [],
    cursor: { x: -9999, y: -9999 },
    cursorLastMoved: -999,
    cursorActivity: 0, // smoothed value — rises slowly, falls with natural decay
  })

  useImperativeHandle(ref, () => ({
    addRipple(x, y) {
      stateRef.current.ripples.push({ x, y, t: performance.now() / 1000 })
    },
    moveCursor(x, y) {
      stateRef.current.cursor = { x, y }
      stateRef.current.cursorLastMoved = performance.now() / 1000
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

    let prevTs = 0
    const draw = (ts) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 0.016
      prevTs = ts
      const t = ts / 1000
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)
      ctx.font = `${Math.round(CELL * 0.62)}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Cull ripples older than 5s
      stateRef.current.ripples = stateRef.current.ripples.filter(r => t - r.t < 5)

      const cols = Math.ceil(W / CELL) + 1
      const rows = Math.ceil(H / CELL) + 1
      const { cursor, cursorLastMoved } = stateRef.current

      // Natural exponential decay when idle; rise is rate-limited so the
      // transition from idle → active eases in rather than snapping.
      const naturalActivity = Math.exp(-Math.max(0, t - cursorLastMoved) * 1.2)
      const prev = stateRef.current.cursorActivity
      stateRef.current.cursorActivity =
        naturalActivity > prev
          ? Math.min(naturalActivity, prev + 5 * dt) // ease in at 5 units/s (~200ms 0→1)
          : naturalActivity                           // ease out follows natural decay
      const cursorActivity = stateRef.current.cursorActivity

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = (col + 0.5) * CELL
          const cy = (row + 0.5) * CELL

          // Gentle ambient breathing
          const ambient =
            Math.sin(col * 0.45 + t * 0.35) *
            Math.sin(row * 0.38 + t * 0.28) *
            0.06

          // Each ripple is a Gaussian ring expanding outward at SPEED px/s.
          // The envelope peak travels with the wave front, so the ring starts
          // at the origin and grows outward — never inward.
          let ripple = 0
          for (const r of stateRef.current.ripples) {
            const dx = cx - r.x
            const dy = cy - r.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const age = t - r.t
            const waveFront = age * SPEED
            const distFromFront = dist - waveFront
            const envelope = Math.exp(-(distFromFront * distFromFront) / (SIGMA * SIGMA))
            const oscillation = Math.sin(dist * K - age * OMEGA)
            const timeFade = Math.exp(-age * 0.55)
            const distFade = Math.exp(-dist * 0.005) // loses power as ring grows
            ripple += oscillation * envelope * timeFade * distFade * 1.8
          }

          // Cursor proximity (0–1 within 180px), fades when cursor is idle
          const cdx = cx - cursor.x
          const cdy = cy - cursor.y
          const cursorDist = Math.sqrt(cdx * cdx + cdy * cdy)
          const cursorGlow = Math.max(0, 1 - cursorDist / 180) * cursorActivity
          const cursorPush = cursorGlow * cursorGlow * 0.9

          const intensity = Math.max(-1, Math.min(1, ambient + ripple + cursorPush))

          // Character based on combined intensity (-1 → 1 mapped across CHARS)
          const idx = Math.max(
            0,
            Math.min(
              CHARS.length - 1,
              Math.floor(((intensity + 1) / 2) * (CHARS.length - 1))
            )
          )
          const char = CHARS[idx]
          if (char === ' ') continue

          // Alpha: dim at rest, bright at peaks + cursor
          const baseAlpha = 0.1 + Math.abs(intensity) * 0.6
          const alpha = Math.min(0.92, baseAlpha + cursorGlow * 0.55)

          // Color: blend slate-400 (148,163,184) → cyan-400 (34,211,238)
          const cyanBlend = Math.max(cursorGlow * 0.85, Math.max(0, intensity) * 0.55)
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
