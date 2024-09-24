import Logo from './logo/Logo'
import Navbar from './navbar/Navbar'
import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
    </header>
  )
}
export default Header
