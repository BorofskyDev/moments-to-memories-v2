import styles from './BodyText.module.scss'

function BodyText({children, className}) {
  return (
    <p className={`${className} ${styles.bodyText}`}>{children}</p>
  )
}
export default BodyText