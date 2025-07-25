import styles from './style.module.css';
import { useRef, useEffect } from 'react'
import Typed from 'typed.js'
import Robot from './3Drobot';

function Landing() {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Developer", "Programmer", "Sketch artist"],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    return (
        <div>
            <div className={styles.main}>
                <div className={styles.content}>
                    <h1
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0"
                        data-aos-duration="1500"
                        className={styles.name}
                    >
                        Hi, I'm KUMAR SHANU
                    </h1>
                    <div
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0"
                        data-aos-duration="3000"
                        className={styles.shortDesc}
                    >
                        I'm a <span ref={el} />
                    </div>
                    <p
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0"
                        data-aos-duration="2000"
                        className={styles.desc}
                    >
                        Shaping concepts into real projects that deliver results
                    </p>
                </div>
            </div>
            <Robot/>
        </div>
    );
}

export default Landing;