import SaveSvg from '@/components/layout/svgs/save-svg/SaveSvg'
import styles from './SaveButton.module.scss'

const SaveButton = ({ type, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.saveButton} ${className}`}
    >
      <SaveSvg /> <span>Save</span> 
    </button>
  )
}
export default SaveButton
