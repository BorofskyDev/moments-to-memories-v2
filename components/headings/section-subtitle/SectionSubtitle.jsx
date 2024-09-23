import styles from './SectionSubtitle.module.scss'

function SectionSubtitle({ children, className }) {
  return (
    <h3 className={`${styles.sectionSubtitle} ${className}`}>{children}</h3>
  )
}
export default SectionSubtitle
