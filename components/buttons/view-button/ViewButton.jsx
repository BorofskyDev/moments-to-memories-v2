import ViewSvg from '@/components/layout/svgs/view-svg/ViewSvg'
import styles from './ViewButton.module.scss'

function ViewButton({onClick, className, text}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.viewButton} ${className}`}
    >
      <ViewSvg />  <span>{text}</span>
      
    </button>
  )
}
export default ViewButton