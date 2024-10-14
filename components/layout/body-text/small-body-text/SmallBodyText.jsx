import styles from './SmallBodyText.module.scss'

const SmallBodyText = ({ className, text }) => {
  return <p className={`${styles.smallBodyText} ${className}`}>{text}</p>
}
export default SmallBodyText
