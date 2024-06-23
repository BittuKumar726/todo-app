import React, { useState } from "react";
import TodoItemRow from "./TodoItemRow";
import styles from "./todolist.module.css";
import Modal from "./Modal/Modal";
import CustomModal from "./Modal/Modal";
import TaskForm from "./TaskForm";
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
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmModal = () => {
    console.log("Confirmed!");
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.actionDiv}>
        <div>
          <button onClick={openModal} className={styles.btn}>
            Add Task
          </button>
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
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmModal}
        title="Custom Modal Title"
        hideFooter={true}
      >
        <TaskForm />
      </CustomModal>
    </>
  );
};

export default TodoList;
