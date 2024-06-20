import { Edit3, Trash } from "react-feather";
import styles from "./todoitemrow.module.css";

const TodoItemRow = (props: any) => {
  const { title, desc, status } = props;
  const onEdit = () => {
    console.log("Edit");
  };
  const onDelete = () => {
    console.log("Delete");
  };
  return (
    <>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.status}>{status}</div>
      <div className={styles.action}>
        <div onClick={onEdit} className={styles.actionButton}>
          <Edit3 size={18} />
        </div>
        <div onClick={onDelete} className={styles.actionButton}>
          <Trash size={18} color="red" />
        </div>
      </div>
    </>
  );
};

export default TodoItemRow;
