import { Suspense, useEffect, useRef, useState, type ComponentType } from 'react'

type Props = { id: string; Component: ComponentType; minHeight: number }

export default function DeferredSection({ id, Component, minHeight }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!('IntersectionObserver' in window)) { setLoaded(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoaded(true); observer.disconnect() }
    }, { rootMargin: '680px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div id={id} ref={ref} className="deferred-section" style={{ minHeight: loaded ? undefined : `${minHeight}px` }}>
    {loaded && <Suspense fallback={<div className="section-loading" aria-hidden="true" style={{ minHeight }}><div className="loading-track"><span /></div></div>}><Component /></Suspense>}
  </div>
}
