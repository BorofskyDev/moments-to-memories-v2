// components/layout/pagination/Pagination.jsx

import React from 'react'
import NextPrevSvg from '../svgs/next-prev-svg/NextPrevSvg'
import styles from './Pagination.module.scss'
import generatePageNumbers from '@/libs/functions/pagination/generatePageNumbers' // Import helper function

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0) return null

  const pages = generatePageNumbers(currentPage, totalPages)

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
        aria-label='Previous Page'
      >
        <NextPrevSvg  />
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={styles.paginationEllipsis}
            >
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.pageButton__active : ''
            }`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
        aria-label='Next Page'
      >
        <NextPrevSvg  />{' '}
      </button>
    </div>
  )
}

export default Pagination
