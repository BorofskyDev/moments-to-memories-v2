import TrashSvg from '@/components/layout/svgs/trash-svg/TrashSvg'
import styles from './DeleteButton.module.scss'

const DeleteButton = ({ className, onClick, type, text }) => {
  return (
    

    <button
      type={type}
      onClick={onClick}
      className={`${styles.deleteButton} ${className}`}
    >
      <TrashSvg /> <span>{text}</span>
    </button>

    
  )
}
export default DeleteButton
