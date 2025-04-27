import styles from './style.module.css';
import { skills } from '@/constants/skills';
import TreeNode from './TreeNode';
import DynamicIconCloud from './skillIconCloud';

const SkillSection = () => {
    return (
        <div className={styles.skillSection}>
            <p className="subTitle">WHAT I BRING TO THE TABLE</p>
            <h1 className="title">Skills.</h1>
            <div style={{ display: "flex" }}>
                <ul className={styles.tree}>
                    {skills.map(node => (
                        <TreeNode key={node.id} node={node} />
                    ))}
                </ul>
                <DynamicIconCloud />
            </div>
        </div>
    );
};

export default SkillSection;
