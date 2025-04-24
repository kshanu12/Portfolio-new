import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {expDetails} from './expDetails'; 
import styles from './style.module.css';
import { icons } from '../Icons';
import { useState, useEffect } from 'react';

function ExperienceSection() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cardTitle = {
        fontSize: windowWidth <= 768 ? '1.2rem' : '1.5rem',
        color: 'white',
    };

    const pointsListStyle = {
        padding: windowWidth <= 480 ? '0.5rem' : '1rem 0 0 1rem',
        fontSize: windowWidth <= 480 ? '12px' : '1rem',
        textAlign: 'justify',
    };

    return (
        <div className={styles.experienceSection}>
            <p className={styles.subTitle}>WHAT I HAVE DONE SO FAR</p>
            <h1 className={styles.title} >Work Experience.</h1>
            <VerticalTimeline className={styles.verticalTimeline}>
                {[...expDetails].reverse().map(detail => (
                    <VerticalTimelineElement
                        className = { styles.verticalTimelineElement }
                        key={detail.id}
                        date={detail.date}
                        dateClassName={styles.date}
                        icon={icons[detail.type]}
                        iconStyle={{ background: 'radial-gradient(#666, #000)', color: '#fff' }}
                        contentStyle={{ borderRight: '2px solid #fff', background: 'linear-gradient(#1b1b1b, #000)', borderRadius:'8px' }}
                    >
                        <h2 style={cardTitle}>{detail.title}</h2>
                        <h5>{detail.company_name}</h5>
                        <ul style={pointsListStyle}>
                            {detail.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    );
}

export default ExperienceSection;