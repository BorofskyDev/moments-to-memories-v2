import styles from './MainActionButton.module.scss'

const MainActionButton = ({ onClick, className, text }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.mainActionButton} ${className}`}
    >
     <span>{text}</span>
    </button>
  )
}
export default MainActionButton
