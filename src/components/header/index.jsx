import styles from './style.module.css';
import { useState } from 'react';

function Header() {
    const [isMenuOpen, SetIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        SetIsMenuOpen(prev => !prev);
    }

    return (
        <header className={styles.header}>
            <h1 data-aos="fade-down" data-aos-duration="500" className={styles.logo}>KS</h1>
            <nav className={styles.desktopNav}>
                <a data-aos="fade-down" data-aos-duration="1000" className={styles.anchor} href="#">HOME</a>
                <a data-aos="fade-down" data-aos-duration="1500" className={styles.anchor} href="#">ABOUT</a>
                <a data-aos="fade-down" data-aos-duration="2000" className={styles.anchor} href="#">SKILLS</a>
                <a data-aos="fade-down" data-aos-duration="2500" className={styles.anchor} href="#">PROJECTS</a>
                <a data-aos="fade-down" data-aos-duration="3000" className={styles.anchor} href="#">CONTACT</a>
            </nav>
            <nav className={styles.hamburgerNav}>
                <div
                    className={isMenuOpen
                        ? `${styles.hamburgerIcon} ${styles.hamburgerIconOpen}`
                        : styles.hamburgerIcon}
                    onClick={toggleMenu}
                >
                    <span className={styles.hamburgerLines}></span>
                    <span className={styles.hamburgerLines}></span>
                    <span className={styles.hamburgerLines}></span>
                </div>
                <div className={isMenuOpen
                    ? `${styles.hamburgerLinks} ${styles.hamburgerLinksOpen}`
                    : styles.hamburgerLinks}
                >
                    <a onClick={toggleMenu} className={styles.hamburgerAnchor} href="#">HOME</a>
                    <a onClick={toggleMenu} className={styles.hamburgerAnchor} href="#">ABOUT</a>
                    <a onClick={toggleMenu} className={styles.hamburgerAnchor} href="#">SKILLS</a>
                    <a onClick={toggleMenu} className={styles.hamburgerAnchor} href="#">PROJECTS</a>
                    <a onClick={toggleMenu} className={styles.hamburgerAnchor} href="#">CONTACT</a>
                </div>
            </nav>
        </header>
    );
}

export default Header;
