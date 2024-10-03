import TrashSvg from '@/components/layout/svgs/trash-svg/TrashSvg'
import styles from './DeleteButton.module.scss'

const DeleteButton = ({ className, onClick, type }) => {
  return (
    

    <button
      type={type}
      onClick={onClick}
      className={`${styles.deleteButton} ${className}`}
    >
      <TrashSvg /> <span>Delete</span>
    </button>

    
  )
}
export default DeleteButton
