import styles from './MediumBodyText.module.scss'

function MediumBodyText({children, className}) {
    return (
        <p className={`${className} ${styles.mediumBodyText}`}>{children}</p>
    )
    }

export default MediumBodyText