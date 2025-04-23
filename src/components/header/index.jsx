import styles from './style.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <h1 data-aos="fade-down" data-aos-duration="500" className={styles.logo}>KS</h1>
            <nav className={styles.nav}>
                <a data-aos="fade-down" data-aos-duration="1000" className={styles.anchor} href="#">HOME</a>
                <a data-aos="fade-down" data-aos-duration="1500" className={styles.anchor} href="#">ABOUT</a>
                <a data-aos="fade-down" data-aos-duration="2000" className={styles.anchor} href="#">SKILLS</a>
                <a data-aos="fade-down" data-aos-duration="2500" className={styles.anchor} href="#">PROJECTS</a>
                <a data-aos="fade-down" data-aos-duration="3000" className={styles.anchor} href="#">CONTACT</a>
            </nav>
        </header>
    );
}

export default Header;