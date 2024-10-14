import styles from './ExternalPageLink.module.scss'

const ExternalPageLink = ({href, children}) => {
  return (
    <a className={`${styles.externalPageLink}`} href={href} target='_blank'>
      {children}
    </a>
  )
}
export default ExternalPageLink
