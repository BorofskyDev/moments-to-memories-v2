import CancelSvg from '@/components/layout/svgs/cancel-svg/CancelSvg'
import styles from './CancelButton.module.scss'

const CancelButton = ({ type, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.cancelButton} ${className}`}
    >
      <CancelSvg /> <span>Cancel</span>
    </button>
  )
}
export default CancelButton
