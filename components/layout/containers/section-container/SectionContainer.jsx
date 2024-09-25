import styles from './SectionContainer.module.scss'


function SectionContainer({children, className}) {
  return (
    <section className={`${styles.sectionContainer} ${className}`}>
        {children}
    </section>
  )
}

export default SectionContainer