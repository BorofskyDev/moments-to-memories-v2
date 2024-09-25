

export const flashAnimation = {
  hidden: { opacity: 0 },
  flash: {
    opacity: [0, 1, 0],
    transition: { duration: 0.5, times: [0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
}
