"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { icons } from "../Icons";

export default function Toast({ message, show, onClose, type }) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        let timer;
        if (show) {
            setVisible(true);
            timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 400);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [show, onClose]);

    if (!visible) return null;

    return (
        <div className={`${styles.toast} ${show ? styles.fadeIn : styles.fadeOut}`}>
            <span>{message}</span>
            <button className={styles.closeIcon} onClick={onClose}>
                {icons["close"]}
            </button>
            <div className={`${styles.progress} ${type === "error" ? styles.error : styles.success}`} />
        </div>
    );
}
