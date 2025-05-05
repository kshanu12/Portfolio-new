import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { socialMedia } from '@/constants/socialMedia';
import { icons } from '../Items/Icons';
import styles from './style.module.css';
import Link from "next/link";
import Toast from '../Items/Toast';

function ContactSection() {
    const form = useRef();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [toastType, setToastType] = useState("success");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
                form.current,
                {
                    publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
                }
            ).then(() => {
                console.log("success")
                setToastMessage("Boom! Your message is flying through the web. 📩");
                setShowToast(true);
                setToastType("success");
                form.current.reset();
            })
            .catch((err) => {
                console.log("success")
                setToastMessage("Well, that didn’t go as planned. 😓");
                setShowToast(true);
                setToastType("error");
                console.error("EmailJS error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <div className={styles.contactSection}>
            <div className={styles.contactBody}>
                <p className="subTitle">GET IN TOUCH</p>
                <h1 className="title">Contact.</h1>
                <form ref={form} onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputSection}>
                        <label className={styles.inputTitle} htmlFor="name">Your Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="What's your good name?"
                        />
                    </div>
                    <div className={styles.inputSection}>
                        <label className={styles.inputTitle} htmlFor="email">Your Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="What's your web address?"
                        />
                    </div>
                    <div className={styles.inputSection}>
                        <label className={styles.inputTitle} htmlFor="message">Your Message</label>
                        <textarea
                            className={styles.input}
                            id="message"
                            name="message"
                            rows="8"
                            required
                            placeholder="What you want to say?"
                        />
                    </div>
                    {loading ?
                        <button className={styles.submitBtn} disabled={true}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </button> :
                        <button type="submit" className={styles.submitBtn}>Send</button>
                    }
                </form>
                <div className={styles.seperator}>. . .</div>
                <div className={styles.socialMedia}>
                    {socialMedia.map(profile => {
                        return (profile?.isVisible &&
                            <Link
                                key={profile.id}
                                target='_blank'
                                href={profile.href}
                                className={styles.socialMediaIcon}
                            >
                                {icons[profile.name]}
                            </Link>)
                    })}
                </div>
            </div>
            {
                showToast &&
                <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} type={toastType} />
            }
        </div>
    );
}

export default ContactSection;
