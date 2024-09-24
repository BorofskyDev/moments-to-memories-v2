import styles from './Header.module.scss'
import Logo from './logo/Logo'

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  )
}
export default Header
