import styles from './PageHeading.module.scss'

function PageHeading({children, className}) {
  return (
    <h1 className={`${styles.pageHeading} ${className}`}>{children}</h1>
  )
}
export default PageHeading