import React, { useState } from 'react';
import styles from './style.module.css';
import { skills as initialSkills } from '@/constants/skills';
import TreeNode from './TreeNode';
import DynamicIconCloud from './skillIconCloud';
import useWindowWidth from '@/hooks/useWindowWidth';

const SkillSection = () => {
    const { windowWidth } = useWindowWidth();
    const [skills, setSkills] = useState(initialSkills);

    const toggleNode = (nodeId) => {
        const toggle = (nodes) => {
            return nodes.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, isOpen: !node.isOpen };
                }

                if (node.children) {
                    return { ...node, children: toggle(node.children) };
                }
                return node;
            });
        };
        setSkills(toggle(skills));
    };

    return (
        <div className={styles.skillSection}>
            <p className="subTitle">WHAT I BRING TO THE TABLE</p>
            <h1 className="title">Skills.</h1>
            <div style={{ display: "flex" }}>
                <ul className={styles.tree}>
                    {skills.map(node => (
                        <TreeNode
                            key={node.id}
                            node={node}
                            toggleNode={toggleNode}
                        />
                    ))}
                </ul>
                {
                    windowWidth > 768 &&
                    <DynamicIconCloud />
                }
            </div>
        </div>
    );
};

export default SkillSection;
