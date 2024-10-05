import CancelSvg from '@/components/layout/svgs/cancel-svg/CancelSvg'
import styles from './CancelButton.module.scss'

const CancelButton = ({ type, onClick, className, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.cancelButton} ${className}`}
    >
      <CancelSvg /> <span>{text}</span>
    </button>
  )
}
export default CancelButton
