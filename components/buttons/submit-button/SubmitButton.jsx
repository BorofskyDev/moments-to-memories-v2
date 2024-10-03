import SubmitSvg from '@/components/layout/svgs/submit-svg/SubmitSvg'
import styles from './SubmitButton.module.scss'

const SubmitButton = ({ type, className, text }) => {
  return (
    <button type={type} className={`${styles.submitButton} ${className}`}>
      <SubmitSvg /> <span>{text} </span>
    </button>
  )
}
export default SubmitButton
