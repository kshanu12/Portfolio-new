import Spline from "@splinetool/react-spline";
import styles from "./style.module.css"

function Robot() {
  return (
    <div
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="300"
      data-aos-offset="0"
      data-aos-duration="1500"
      className={styles.main}
    >
      <div className={styles.robotContainer}>
        <Spline className={styles.robot} scene="https://prod.spline.design/qiJVRVJMflaVFQUT/scene.splinecode" />
        <div className={styles.hideLogo} />
      </div>
    </div>

  );
}

export default Robot;
