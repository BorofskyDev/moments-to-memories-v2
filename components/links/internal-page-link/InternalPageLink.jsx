import Link from 'next/link'
import styles from './InternalPageLink.module.scss'

function InternalPageLink({ href, children }) {
  return (
    <Link href={href} className={styles.internalPageLink}>
      {children}
    </Link>
  )
}
export default InternalPageLink
