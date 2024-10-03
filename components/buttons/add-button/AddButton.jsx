import PlusSvg from '@/components/layout/svgs/plus-svg/PlusSvg'
import styles from './AddButton.module.scss'

const AddButton = ({ type, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.addButton} ${className}`}
    >
      <PlusSvg />
      <span>Add</span>
    </button>
  )
}

export default AddButton
