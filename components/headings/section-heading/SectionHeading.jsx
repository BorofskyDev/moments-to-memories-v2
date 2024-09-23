import styles from './SectionHeading.module.scss'

function SectionHeading({ children, className }) {
  return <h2 className={`${styles.sectionHeading} ${className}`}>{children}</h2>
}
export default SectionHeading
