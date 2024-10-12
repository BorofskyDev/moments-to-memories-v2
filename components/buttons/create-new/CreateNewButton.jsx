import CreateNewSvg from '@/components/layout/svgs/create-new-svg/CreateNewSvg'
import styles from './CreateNewButton.module.scss'

const CreateNewButton = ({ onClick, text, className }) => {
    return (
        <button onClick={onClick} className={`${styles.createNewButton} ${className}`}>
            <CreateNewSvg /> <span>{text}</span>
        </button>
    )
}

export default CreateNewButton