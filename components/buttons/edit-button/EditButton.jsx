import EditSvg from '@/components/layout/svgs/edit-svg/EditSvg'
import styles from './EditButton.module.scss'

const EditButton = ({ onClick, text, className }) => {
  return (
    <button className={`${styles.editButton} ${className}`} onClick={onClick}>
      <EditSvg /><span>{text}</span>
      
    </button>
  )
}

export default EditButton
