import Link from 'next/link'
import styles from './CtaButton.module.scss'
import FlashWrapper from '@/libs/hoc/FlashWrapper'

function CtaButton({href, children}) {
  return (
    <FlashWrapper>
      
      <Link href={href} className={styles.ctaButton}>{children}</Link>
    </FlashWrapper>
  )
}
export default CtaButton