import styles from "../style.module.css"

function TreeNode({ node, toggleNode }) {
    return (
        <li>
            {node.children ? (
                <>
                    <input
                        type="checkbox"
                        id={node.id}
                        onChange={() => toggleNode(node.id)}
                        checked={node?.isOpen}
                    />
                    <label htmlFor={node.id} className={styles.tree_label}>{node.label}</label>
                    <ul>
                        {node.children.map(child => (
                            <TreeNode
                                key={child.id}
                                node={child}
                                toggleNode={toggleNode}
                            />
                        ))}
                    </ul>
                </>
            ) : (
                <span className={styles.tree_label} style={{ fontSize: "12px" }}>{node.label}</span>
            )}
        </li>
    );
}

export default TreeNode;
