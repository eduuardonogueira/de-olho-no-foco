import { useEffect, useState } from 'react'

export const useBreakpoints = () => {
  const [windowSize, setWindowSize] = useState({
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
    width: typeof window === 'undefined' ? 0 : window.innerWidth
  })

  const handleResize = () => {
    setWindowSize({
      height: typeof window === 'undefined' ? 0 : window?.innerHeight,
      width: typeof window === 'undefined' ? 0 : window?.innerWidth
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize.width])

  return {
    isMobile: windowSize.width <= 580,
    isTablet: windowSize.width <= 768,
    isLaptop: 960 <= windowSize.width,
    isDesktop: 1280 <= windowSize.width,
    isLargeDesktop: windowSize.width >= 1920,
    isCustomBreakpoint: (customWidth: number) => customWidth <= windowSize.width,
    windowSize
  }
}