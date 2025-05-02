import React, { useState, useEffect } from 'react';
import { Cloud, renderSimpleIcon, fetchSimpleIcons } from 'react-icon-cloud';
import styles from '../style.module.css'

const useIcons = (slugs) => {
    const [icons, setIcons] = useState()
    useEffect(() => { fetchSimpleIcons({ slugs }).then(setIcons) }, [])

    if (icons) {
        return Object.values(icons.simpleIcons).map((icon) => renderSimpleIcon({
            icon,
            size: 42,
            aProps: {
                onClick: (e) => e.preventDefault()
            }
        }))
    }
}

const slugs = [
    'c',
    'cplusplus',
    'javascript',
    'typescript',
    'python',
    'graphql',
    'react',
    'nextdotjs',
    'redux',
    'zustand',
    'tailwindcss',
    'mui',
    'html5',
    'css3',
    'vitest',
    'nodedotjs',
    'nestjs',
    'express',
    'postgresql',
    'mongodb',
    'git',
    'swagger',
    'docker',
    'jira',
    'confluence',
    'linux',
    'postman'
];


function DynamicIconCloud() {
    const icons = useIcons(slugs);
    return (
        <div className={styles.skillCloud}>
            <Cloud
                options={{
                    clickToFront: 500,
                    depth: 1,
                    initial: [0.03, -0.03],
                    wheelZoom: false,
                    dragControl: true,
                    decel: 0.95,
                    outlineColour: 'transparent',
                    reverse: true,
                    speed: 0.5,
                }}
            >
                {icons}
            </Cloud>
        </div>
    );
}

export default DynamicIconCloud;