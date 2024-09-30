import Link from 'next/link'
import styles from './NavLink.module.scss'

function NavLink({ href, children, onClick, className }) {
  return (
    <Link href={href} className={`${styles.navLink} ${className}`} onClick={onClick}>
      {children}
    </Link>
  )
}
export default NavLink
