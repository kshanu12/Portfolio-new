import { icons } from '../Icons';
import styles from './style.module.css';
import Link from "next/link";
import { useState } from 'react';

const socialMedia = [
    {
        id: 1,
        name: "linkedin",
        href: "https://www.linkedin.com/in/kumar-shanu-601810211/",
        isVisible: true
    },
    {
        id: 2,
        name: "instagram",
        href: "https://www.instagram.com/_k_shanu__",
        isVisible: true
    },
    {
        id: 3,
        name: "twitter",
        href: "https://www.x.com/kshanu123",
        isVisible: false
    },
    {
        id: 4,
        name: "facebook",
        href: "https://m.facebook.com/100007703867030",
        isVisible: true
    },
]

function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here (API call or form processing)
        console.log('Form submitted:', formData);
    };

    return (
        <div className={styles.contactSection}>
            <div className={styles.contactBody}>
                <p className="subTitle">GET IN TOUCH</p>
                <h1 className="title">Contact.</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputSection}>
                        <label className={styles.inputTitle} htmlFor="name">Your Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
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
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="What you want to say?"
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn}>Send</button>
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
        </div>
    );
}

export default ContactSection;
