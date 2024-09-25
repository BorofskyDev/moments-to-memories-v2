import Image from 'next/image'
import styles from './PortraitImage.module.scss'

function PortraitImage({src, alt, className}) {
    return (
        <Image className={`${styles.portraitImage} ${className}`} src={src} alt={alt} height='1080' width='1920' />
    )
}

export default PortraitImage