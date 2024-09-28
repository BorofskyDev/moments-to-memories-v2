import { useEffect } from 'react'

const useCarouselOpacity = (carouselRef, imageRefs) => {
  const handleScroll = () => {
    if (!carouselRef.current || !imageRefs.current.length) return

    const carousel = carouselRef.current
    const carouselRect = carousel.getBoundingClientRect()
    const carouselCenter = carouselRect.left + carouselRect.width / 2

    imageRefs.current.forEach((img) => {
      if (img) {
        const imgRect = img.getBoundingClientRect()
        const imgCenter = imgRect.left + imgRect.width / 2
        const distance = Math.abs(carouselCenter - imgCenter)

        const maxDistance = carouselRect.width / 2
        const opacity = Math.max(1 - distance / maxDistance, 0)

        img.style.opacity = opacity
        img.style.transform = `scale(${1 + 0.05 * (1 - opacity)})`
      }
    })
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      handleScroll()

      carousel.addEventListener('scroll', handleScroll)

      return () => {
        carousel.removeEventListener('scroll', handleScroll)
      }
    }
  }, [carouselRef, imageRefs])
}

export default useCarouselOpacity
