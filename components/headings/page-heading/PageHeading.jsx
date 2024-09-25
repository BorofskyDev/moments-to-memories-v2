import FlashWrapper from '@/libs/hoc/FlashWrapper'
import styles from './PageHeading.module.scss'

function PageHeading({children, className}) {
  return (
    <FlashWrapper>
      <h1 className={`${styles.pageHeading} ${className}`}>{children}</h1>

    </FlashWrapper>
  )
}
export default PageHeading