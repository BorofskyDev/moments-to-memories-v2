import Link from 'next/link'
import styles from './InternalPageLink.module.scss'

function InternalPageLink({ href, children, className }) {
  return (
    <Link href={href} className={`${styles.internalPageLink} ${className}`}>
     <span>{children}</span> 
    </Link>
  )
}
export default InternalPageLink
