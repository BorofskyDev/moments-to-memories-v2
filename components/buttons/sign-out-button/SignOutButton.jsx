import styles from './SignOutButton.module.scss'

const SignOutButton = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.signOutButton} ${className}`}
    >
      Sign Out
    </button>
  )
}

export default SignOutButton
