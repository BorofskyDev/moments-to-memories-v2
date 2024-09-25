import styles from './ParagraphHeading.module.scss'

function ParagraphHeading({ children, className }) {
    return (
        <h5 className={`${styles.paragraphHeading} ${className}`}>{children}</h5>
    )
    }

export default ParagraphHeading