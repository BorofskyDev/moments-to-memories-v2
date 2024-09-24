import Link from 'next/link'
import styles from './CtaButton.module.scss'

function CtaButton({href, children}) {
  return (
    <Link href={href} className={styles.ctaButton}>{children}</Link>
  )
}
export default CtaButton