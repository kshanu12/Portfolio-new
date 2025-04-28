'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import Link from "next/link";
import { icons } from '../Icons';

const InfiniteCircularGallery = ({ items }) => {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef(null);
    const scrollValueRef = useRef(-1);
    const autoScrollingRef = useRef(true);
    const requestRef = useRef();
    const previousTimeRef = useRef();

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }

        document.documentElement.style.height = `${items.length * 100}%`;

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const kVal = scrollTop / scrollHeight * 2 - 1;
            document.body.style.setProperty('--k', kVal);
            scrollValueRef.current = kVal;

            if (Math.abs(kVal) > 0.95) {
                const newPosition = 0.5 * (kVal - Math.sign(kVal) + 1) * scrollHeight;
                requestAnimationFrame(() => {
                    window.scrollTo(0, newPosition);
                });
            }

            updateCardVisibility();
        };

        const updateCardVisibility = () => {
            const articles = sectionRef.current.querySelectorAll(`.${styles.article}`);
            const kVal = scrollValueRef.current;

            articles.forEach((article, i) => {
                const j = i / items.length;
                const difLin = j - kVal;
                const absLin = Math.abs(difLin);
                const difMid = 0.5 - absLin;
                const absMid = Math.abs(difMid);
                const difArc = 2 * (0.5 - absMid);
                const lim = 0.35;
                const sel = Math.max(0, (lim - difArc) / lim);

                article.style.pointerEvents = sel > 0.5 ? 'auto' : 'none';

                // Add a data attribute to track the active card
                if (sel > 0.8) {
                    article.dataset.active = 'true';
                } else {
                    article.dataset.active = 'false';
                }
            });
        };

        // Initialize the gallery
        const initGallery = () => {
            window.scrollTo(0, 0);
            setTimeout(() => {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo(0, scrollHeight * 0.5);
                scrollValueRef.current = 0;
                document.body.style.setProperty('--k', 0);
                updateCardVisibility();

                // Start animation loop
                previousTimeRef.current = performance.now();
                requestRef.current = requestAnimationFrame(animateScroll);
            }, 100);
        };

        // Animation function using requestAnimationFrame for smoother scrolling
        const animateScroll = (time) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - previousTimeRef.current;

                // Only update if auto-scrolling is enabled
                if (autoScrollingRef.current) {
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollSpeed = 0.00005; // Adjust for desired speed
                    const currentK = scrollValueRef.current;
                    const newK = currentK + scrollSpeed * deltaTime;

                    // Calculate new scroll position
                    const newScrollTop = ((newK + 1) / 2) * scrollHeight;
                    window.scrollTo(0, newScrollTop);
                }
            }

            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animateScroll);
        };

        // Manual scrolling/dragging functionality
        let isDragging = false;
        let startY = 0;
        let currentK = 0;

        const handleMouseDown = (e) => {
            isDragging = true;
            startY = e.clientY;
            currentK = scrollValueRef.current;
            // Disable auto-scrolling during drag
            autoScrollingRef.current = false;
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const movement = deltaY / window.innerHeight;
            const newK = currentK - movement;
            const newScrollTop = ((newK + 1) / 2) * scrollHeight;
            window.scrollTo(0, newScrollTop);
        };

        const handleMouseUp = () => {
            isDragging = false;
            // Re-enable auto-scrolling after drag
            if (!document.querySelector(`.${styles.article}:hover`)) {
                autoScrollingRef.current = true;
            }
        };

        // For touch devices
        const handleTouchStart = (e) => handleMouseDown(e.touches[0]);
        const handleTouchMove = (e) => handleMouseMove(e.touches[0]);
        const handleTouchEnd = () => handleMouseUp();

        // Event listeners
        window.addEventListener('scroll', handleScroll);
        sectionRef.current.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        sectionRef.current.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        initGallery();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sectionRef.current?.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            sectionRef.current?.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);

            // Cancel animation frame
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [mounted, items.length]);

    // Individual card hover handlers
    const handleCardMouseEnter = () => {
        autoScrollingRef.current = false;
    };

    const handleCardMouseLeave = () => {
        autoScrollingRef.current = true;
    };

    if (!items || items.length === 0) return null;

    return (
        <div className={styles.container}>
            {/* SVG filter for background grain effect */}
            <svg width="0" height="0" aria-hidden="true">
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="7.13"></feTurbulence>
                    <feColorMatrix type="saturate" values="0"></feColorMatrix>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope=".02"></feFuncA>
                    </feComponentTransfer>
                    <feBlend in2="SourceGraphic"></feBlend>
                </filter>
            </svg>
            <main className={styles.scene}>
                <section
                    className={styles.assembly}
                    ref={sectionRef}
                    style={{ '--n': items.length }}
                >
                    {items.map((item, i) => (
                        <article
                            key={i}
                            className={styles.article}
                            style={{
                                '--i': i,
                                '--url': `url(${item.photoUrl})`,
                                '--pos': item.photoPosition || '50% 50%',
                            }}
                            onMouseEnter={handleCardMouseEnter}
                            onMouseLeave={handleCardMouseLeave}
                        >
                            <header className={styles.itemHeader}>
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <div className="linkIcons">
                                    <Link
                                        target='_blank'
                                        href={item.githubUrl}
                                        className={styles.icon}
                                    >
                                        {icons["github"]}
                                    </Link>
                                    <Link
                                        target='_blank'
                                        href={item.liveUrl}
                                        className={styles.icon}
                                    >
                                        {icons["newTab"]}
                                    </Link>
                                </div>
                            </header>
                            <figure className={styles.figure}>
                                <img
                                    src={item.imageSrc}
                                    alt={item.name}
                                    className={styles.image}
                                />
                            </figure>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default function ProjectSection() {
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        // Animal data for the gallery
        const projects = [
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            },
            {
                name: 'Dribbling Blocks',
                description: 'This is a Dribbling Blocks game inspired by the offline dinosaur game. You control a small block that jumps and dodges increasingly faster obstacles to survive as long as possible.',
                imageSrc: '/dribbling-blocks.png',
                githubUrl: 'https://github.com/kshanu12/Dribbling-block',
                liveUrl: 'https://kshanu12.github.io/Dribbling-block/',
            }
        ];

        setGalleryItems(projects);
    }, []);

    return (
        <div>
            {galleryItems.length > 0 && (
                <InfiniteCircularGallery items={galleryItems} />
            )}
        </div>
    );
}