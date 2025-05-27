import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../style.module.css";
import { icons } from "@/components/Items/Icons";

function InfiniteCircularGallery({ items, scrollController }) {
    const sectionRef = useRef(null);
    const updateIntervalRef = useRef();

    useEffect(() => {
        if (!items || items.length === 0) return;

        const updateCardVisibility = () => {
            const articles = sectionRef?.current?.querySelectorAll(
                `.${styles.article}`
            );

            // Get current k value from CSS custom property
            const kVal = parseFloat(getComputedStyle(document.body).getPropertyValue('--k')) || 0;

            articles?.forEach((article, i) => {
                const j = i / items.length;
                const difLin = j - kVal;
                const absLin = Math.abs(difLin);
                const difMid = 0.5 - absLin;
                const absMid = Math.abs(difMid);
                const difArc = 2 * (0.5 - absMid);
                const lim = 0.35;
                const sel = Math.max(0, (lim - difArc) / lim);

                article.style.pointerEvents = sel > 0.5 ? "auto" : "none";

                // Add a data attribute to track the active card
                if (sel > 0.8) {
                    article.dataset.active = "true";
                } else {
                    article.dataset.active = "false";
                }
            });
        };

        // Update card visibility continuously
        const startVisibilityUpdates = () => {
            updateCardVisibility();
            updateIntervalRef.current = requestAnimationFrame(startVisibilityUpdates);
        };

        startVisibilityUpdates();

        return () => {
            if (updateIntervalRef.current) {
                cancelAnimationFrame(updateIntervalRef.current);
            }
        };
    }, [items]);

    // Individual card hover handlers
    const handleCardMouseEnter = () => {
        if (scrollController) {
            scrollController.pauseAutoScroll();
        }
    };

    const handleCardMouseLeave = () => {
        if (scrollController) {
            scrollController.resumeAutoScroll();
        }
    };

    if (!items || items.length === 0) return null;

    return (
        <div className={styles.container}>
            <main className={styles.scene}>
                <section
                    className={styles.assembly}
                    ref={sectionRef}
                    style={{ "--n": items.length }}
                >
                    {items.map((item, i) => (
                        <article
                            key={i}
                            className={styles.article}
                            style={{
                                "--i": i,
                                "--url": `url(${item?.imageSrc})`,
                                "--pos": item.photoPosition || "50% 50%",
                            }}
                            onMouseEnter={handleCardMouseEnter}
                            onMouseLeave={handleCardMouseLeave}
                        >
                            <header className={styles.itemHeader}>
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <div className="linkIcons">
                                    {item.githubUrl &&
                                        <Link
                                            target="_blank"
                                            href={item.githubUrl}
                                            className={styles.icon}
                                        >
                                            {icons['github']}
                                        </Link>
                                    }
                                    {item.liveUrl &&
                                        <Link
                                            target="_blank"
                                            href={item.liveUrl}
                                            className={styles.icon}
                                        >
                                            {icons["newTab"]}
                                        </Link>
                                    }
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
}

export default InfiniteCircularGallery;
