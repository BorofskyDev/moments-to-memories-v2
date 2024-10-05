import PlusSvg from '@/components/layout/svgs/plus-svg/PlusSvg'
import styles from './AddButton.module.scss'

const AddButton = ({ type, onClick, className, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.addButton} ${className}`}
    >
      <PlusSvg />
      <span>{text}</span>
    </button>
  )
}

export default AddButton
