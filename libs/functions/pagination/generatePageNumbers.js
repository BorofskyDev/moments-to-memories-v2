// libs/functions/pagination/generatePageNumbers.js

/**
 * Generates an array of page numbers and ellipses based on the current page and total pages.
 *
 * @param {number} currentPage - The current active page.
 * @param {number} totalPages - The total number of pages.
 * @returns {Array<number|string>} An array containing page numbers and ellipses.
 */
const generatePageNumbers = (currentPage, totalPages) => {
  if (totalPages === 0) return []

  const pages = []
  const maxVisiblePages = 5
  const half = Math.floor(maxVisiblePages / 2)

  let start = Math.max(1, currentPage - half)
  let end = Math.min(totalPages, currentPage + half)

  if (currentPage <= half) {
    end = Math.min(totalPages, maxVisiblePages)
  } else if (currentPage + half >= totalPages) {
    start = Math.max(1, totalPages - maxVisiblePages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (start > 2) {
    pages.unshift('...')
    pages.unshift(1)
  } else if (start === 2) {
    pages.unshift(1)
  }

  if (end < totalPages - 1) {
    pages.push('...')
    pages.push(totalPages)
  } else if (end === totalPages - 1) {
    pages.push(totalPages)
  }

  return pages
}

export default generatePageNumbers
