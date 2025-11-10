import { useState, useEffect, useRef, RefObject } from 'react'

interface ScrollSection {
  id: string
  ref: RefObject<HTMLElement>
}

interface UseScrollNavigationOptions {
  offset?: number
  threshold?: number
  rootMargin?: string
}

export const useScrollNavigation = (
  sections: ScrollSection[],
  options: UseScrollNavigationOptions = {}
) => {
  const {
    offset = 150,
    threshold = 0.3,
    rootMargin = '-150px 0px -66% 0px'
  } = options

  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    if (!section?.ref.current) return

    // Set active section immediately
    setActiveSection(sectionId)
    
    // Block observer updates during scroll
    isScrollingRef.current = true
    
    // Get the element's position relative to the document
    const element = section.ref.current
    const elementRect = element.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const elementTop = elementRect.top + scrollTop
    const offsetPosition = elementTop - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    // Reset scrolling flag after animation completes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 1000)
  }

  // Intersection Observer to detect active section
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    const visibleSectionsRef = new Map<string, number>()
    let userScrollTimeout: NodeJS.Timeout

    // Handle user scroll - clear the programmatic scroll flag
    const handleUserScroll = () => {
      clearTimeout(userScrollTimeout)
      userScrollTimeout = setTimeout(() => {
        isScrollingRef.current = false
      }, 150)
    }

    const observer = new IntersectionObserver((entries) => {
      // Don't update during programmatic scrolling
      if (isScrollingRef.current) return

      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section-id')
        if (!sectionId) return

        if (entry.isIntersecting) {
          // Store the intersection ratio for comparison
          visibleSectionsRef.set(sectionId, entry.intersectionRatio)
        } else {
          visibleSectionsRef.delete(sectionId)
        }
      })

      // If we have visible sections, find the one with highest intersection ratio
      // Or the first one in order if multiple have same ratio
      if (visibleSectionsRef.size > 0) {
        let maxRatio = 0
        let activeId = sections[0].id

        for (const { id } of sections) {
          const ratio = visibleSectionsRef.get(id)
          if (ratio !== undefined && ratio > maxRatio) {
            maxRatio = ratio
            activeId = id
          }
        }

        setActiveSection(activeId)
      }
    }, observerOptions)

    // Observe all sections
    sections.forEach(({ id, ref }) => {
      if (ref.current) {
        ref.current.setAttribute('data-section-id', id)
        observer.observe(ref.current)
      }
    })

    // Listen for user scroll
    window.addEventListener('scroll', handleUserScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleUserScroll)
      clearTimeout(userScrollTimeout)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [sections])

  return {
    activeSection,
    scrollToSection
  }
}

