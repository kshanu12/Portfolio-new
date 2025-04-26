import styles from './style.module.css';
import { skills } from '@/constants/skills';
import TreeNode from './TreeNode';

const SkillSection = () => {
    return (
        <div>
            <p className="subTitle">WHAT I BRING TO THE TABLE</p>
            <h1 className="title">Skills.</h1>
            <ul className={styles.tree}>
                {skills.map(node => (
                    <TreeNode key={node.id} node={node} />
                ))}
            </ul>
        </div>
    );
};

export default SkillSection;
