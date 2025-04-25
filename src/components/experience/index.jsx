import { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { expDetails } from './expDetails';
import styles from './style.module.css';
import { icons } from '../Icons';

function ExperienceSection() {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateWidth = () => setWindowWidth(window.innerWidth);
            updateWidth(); 
            window.addEventListener('resize', updateWidth);
            return () => window.removeEventListener('resize', updateWidth);
        }
    }, []);

    const cardTitle = {
        fontSize: windowWidth !== null && windowWidth <= 768 ? '1.2rem' : '1.5rem',
        color: 'white',
    };

    const pointsListStyle = {
        padding: windowWidth !== null && windowWidth <= 480 ? '0.5rem' : '1rem 0 0 1rem',
        fontSize: windowWidth !== null && windowWidth <= 480 ? '12px' : '1rem',
        textAlign: 'justify',
    };

    return (
        <div className={styles.experienceSection}>
            <p className="subTitle">WHAT I HAVE DONE SO FAR</p>
            <h1 className="title">Work Experience.</h1>
            <VerticalTimeline className={styles.verticalTimeline}>
                {[...expDetails].reverse().map(detail => (
                    <VerticalTimelineElement
                        className={styles.verticalTimelineElement}
                        key={detail.id}
                        date={detail.date}
                        dateClassName={styles.date}
                        icon={icons[detail.type]}
                        iconStyle={{
                            background: 'radial-gradient(#666, #000)',
                            color: '#fff',
                        }}
                        contentStyle={{
                            borderRight: '2px solid #fff',
                            background: 'linear-gradient(#1b1b1b, #000)',
                            borderRadius: '8px',
                        }}
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
