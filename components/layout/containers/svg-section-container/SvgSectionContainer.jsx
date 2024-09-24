import styles from './SvgSectionContainer.module.scss';

function SvgSectionContainer({children}) {
  return (
    <section className={styles.svgSectionContainer}>
        {children}
    </section>
  )
}
export default SvgSectionContainer