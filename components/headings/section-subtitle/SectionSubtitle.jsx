import FlashWrapper from '@/libs/hoc/FlashWrapper'
import styles from './SectionSubtitle.module.scss'

function SectionSubtitle({ children, className }) {
  return (
    <FlashWrapper>
      <h3 className={`${styles.sectionSubtitle} ${className}`}>{children}</h3>
    </FlashWrapper>
  )
}
export default SectionSubtitle
