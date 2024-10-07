import FacebookSvg from '@/components/layout/svgs/facebook-svg/FacebookSvg'
import InstagramSvg from '@/components/layout/svgs/instagram-svg/InstagramSvg'
import styles from './SocialMediaContainer.module.scss'

const SocialMediaContainer = () => {
  return (
    <div className={styles.socialMediaContainer}>
        <ul className={styles.socialMediaContainer__list}>
            <li>
                <a href="#">
                    <label >Facebook</label>
                    <FacebookSvg />
                </a>
            </li>
            <li>
                <a href="#">
                    <label>Instagram</label>
                    <InstagramSvg />
                </a>
            </li>
        </ul>
    </div>
  )
}
export default SocialMediaContainer