import Spline from "@splinetool/react-spline";
import styles from "./style.module.css"

function Robot() {
  return (
    <div className={styles.main}>
      <div className={styles.robotContainer}>
        <Spline className={styles.robot} scene="https://prod.spline.design/qiJVRVJMflaVFQUT/scene.splinecode" />
        <div className={styles.hideLogo} />
      </div>
    </div>

  );
}

export default Robot;
