import { useEffect, useState } from "react";
import TodoItemRow from "./TodoItemRow";
import styles from "./todolist.module.css";
import CustomModal from "../../components/Modal/Modal";
import TaskForm from "../Form/TaskForm";
import axios from "axios";
import { toast } from "react-toastify";
import CustomSelect from "../../components/Select/select";
const TodoList = () => {
  const [originalTaskList, setOriginalTaskList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmModal = () => {
    setModalOpen(false);
  };

  const getTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todo/list");
      if (response?.data?.statusCode === 200) {
        setTaskList(response?.data?.data);
        setOriginalTaskList(response?.data?.data);
      } else {
        toast.warning(response?.data?.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Something went wrong while fetching todo items!!", {
        position: "top-right",
      });
    }
  };

  const dataSaveSuccess = () => {
    getTodoList();
    setModalOpen(false);
  };

  const onChangeStatus = (event: any) => {
    if (event.target.value === "all") {
      setTaskList(originalTaskList);
      return;
    }
    const filteredList = originalTaskList.filter((item: any) => {
      return item?.status === event.target.value;
    });
    setTaskList(filteredList);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div className={styles.actionDiv}>
        <div>
          <button onClick={openModal} className={styles.btn}>
            Add Task
          </button>
        </div>
        <CustomSelect onChange={onChangeStatus} />
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.title}>Title</div>
          <div className={styles.desc}>Description</div>
          <div className={styles.status}>Status</div>
          <div className={styles.action}>Action</div>
        </div>

        <div className={styles.data}>
          {taskList.length > 0 ? (
            taskList.map((item) => {
              return (
                <div className={styles.rowItem}>
                  <TodoItemRow item={item} dataSaveSuccess={dataSaveSuccess} />{" "}
                </div>
              );
            })
          ) : (
            <span
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                height: "350px",
                width: "100%",
                fontSize: "20px",
                fontWeight: "bold",
                color: "gray",
              }}
            >
              No data found!!
            </span>
          )}
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmModal}
        title="Task Form Modal"
        hideFooter={true}
      >
        <TaskForm dataSaveSuccess={dataSaveSuccess} />
      </CustomModal>
    </>
  );
};

export default TodoList;
