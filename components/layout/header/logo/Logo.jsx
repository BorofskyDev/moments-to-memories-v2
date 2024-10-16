import Link from 'next/link'
import styles from './Logo.module.scss'

function Logo() {
  return (
    <Link href='/' className={styles.logo}><span>moments to memories</span></Link>
  )
}
export default Logo