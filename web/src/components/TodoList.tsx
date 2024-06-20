import React, { useState } from "react";
import TodoItemRow from "./TodoItemRow";
import styles from "./todolist.module.css";
const TodoList = () => {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: "Doctor Appointment",
      desc: "Doctor Appointment description",
      status: "todo",
    },
    {
      id: 2,
      title: "Meeting",
      desc: "Meeting description",
      status: "done",
    },
  ]);
  return (
    <>
      <div className={styles.actionDiv}>
        <div>
          <button className={styles.btn}>Add Task</button>
        </div>
        <div>Filter</div>
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.title}>Title</div>
          <div className={styles.desc}>Description</div>
          <div className={styles.status}>Status</div>
          <div className={styles.action}>Action</div>
        </div>

        <div className={styles.data}>
          {taskList.map((item) => {
            return (
              <div className={styles.rowItem}>
                <TodoItemRow {...item} />{" "}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TodoList;
