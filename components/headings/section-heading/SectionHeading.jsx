import FlashWrapper from '@/libs/hoc/FlashWrapper'
import styles from './SectionHeading.module.scss'

function SectionHeading({ children, className }) {
  return (
    <FlashWrapper>
      <h2 className={`${styles.sectionHeading} ${className}`}>{children}</h2>
    </FlashWrapper>
  )
}
export default SectionHeading
