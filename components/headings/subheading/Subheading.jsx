import styles from './Subheading.module.scss'

function Subheading({children, className}) {
    return (
        <h4 className={`${styles.subheading} ${className}`}>{children}</h4>
    )
    }

export default Subheading