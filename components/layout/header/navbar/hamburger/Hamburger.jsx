import styles from './Hamburger.module.scss'

function Hamburger({ isMenuOpen, handleMenuToggle }) {
  return (
    <button
      className={`${styles.hamburger} ${isMenuOpen ? styles.opened : ''}`}
      onClick={handleMenuToggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
export default Hamburger
