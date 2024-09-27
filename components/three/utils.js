
export const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t

export const getPiramidalIndex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  )



export const getImageDimensions = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.src = src
  })
}
