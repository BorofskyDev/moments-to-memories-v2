import Image from 'next/image'
import styles from './PortraitImage.module.scss'
import FlashWrapper from '@/libs/hoc/FlashWrapper'

function PortraitImage({ src, alt, className }) {
  return (
    <FlashWrapper>
      <Image
        className={`${styles.portraitImage} ${className}`}
        src={src}
        alt={alt}
        height='1080'
        width='1920'
      />
    </FlashWrapper>
  )
}

export default PortraitImage
