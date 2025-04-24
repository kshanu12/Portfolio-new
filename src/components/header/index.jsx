import styles from './style.module.css';
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";

const HEADER_ITEMS = [
    { name: "HOME", duration: 500, href: "/" },
    { name: "ABOUT", duration: 1000, href: "/about" },
    { name: "EXPERIENCE", duration: 1500, href: "/experience" },
    { name: "SKILLS", duration: 2000, href: "/skills" },
    { name: "PROJECTS", duration: 2500, href: "/projects" },
    { name: "CONTACT", duration: 3000, href: "/contact" },
];

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuWrapperRef = useRef(null); // Ref on wrapper around icon + menu

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuWrapperRef.current && !menuWrapperRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={styles.header}>
            <h1 data-aos="fade-down" data-aos-duration="500" className={styles.logo}>KS</h1>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
                {HEADER_ITEMS.map((item) => (
                    <Link
                        href={item.href}
                        data-aos="fade-down"
                        data-aos-duration={item.duration}
                        className={styles.anchor}
                        key={item.name}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Mobile/Hamburger Nav */}
            <div ref={menuWrapperRef} className={styles.hamburgerNav}>
                <div
                    className={
                        isMenuOpen
                            ? `${styles.hamburgerIcon} ${styles.hamburgerIconOpen}`
                            : styles.hamburgerIcon
                    }
                    onClick={toggleMenu}
                >
                    <span className={styles.hamburgerLines}></span>
                    <span className={styles.hamburgerLines}></span>
                    <span className={styles.hamburgerLines}></span>
                </div>

                <div
                    className={
                        isMenuOpen
                            ? `${styles.hamburgerLinks} ${styles.hamburgerLinksOpen}`
                            : styles.hamburgerLinks
                    }
                >
                    {HEADER_ITEMS.map((item) => (
                        <Link
                            href={item.href}
                            className={styles.hamburgerAnchor}
                            key={item.name}
                            onClick={toggleMenu}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Header;
