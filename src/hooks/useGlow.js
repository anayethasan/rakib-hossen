// Pointer-follow blue spotlight for cards (sets CSS vars --mx/--my).
export default function useGlow() {
  return { onMouseMove: (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  } }
}
