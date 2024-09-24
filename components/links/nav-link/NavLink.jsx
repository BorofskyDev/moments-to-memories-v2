import Link from 'next/link'
import styles from './NavLink.module.scss'

function NavLink({ href, children, onClick }) {
  return (
    <Link href={href} className={styles.navLink} onClick={onClick}>
      {children}
    </Link>
  )
}
export default NavLink
