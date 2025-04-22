import styles from './style.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>KS</h1>
            <nav className={styles.nav}>
                <a className={styles.anchor} href="#">HOME</a>
                <a className={styles.anchor} href="#">ABOUT</a>
                <a className={styles.anchor} href="#">SKILLS</a>
                <a className={styles.anchor} href="#">PROJECTS</a>
                <a className={styles.anchor} href="#">CONTACT</a>
            </nav>
        </header>
    );
}

export default Header;