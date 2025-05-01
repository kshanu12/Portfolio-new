import { aboutDetails } from '@/constants/about';
import styles from './style.module.css'

function AboutSection() {
    return (
        <div className={styles.aboutSection}>
            <img src="self.png" className={styles.selfImage} />
            <div className={styles.description}>
                <h2>Hi there,</h2>
                {
                    aboutDetails.map((para, index) =>
                        <p key={index}>{para}</p>
                    )
                }
            </div>
        </div>
    )
}

export default AboutSection;