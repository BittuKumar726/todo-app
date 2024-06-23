import { useEffect, useState } from "react";
import TodoItemRow from "./TodoItemRow"; // Importing TodoItemRow component
import styles from "./todolist.module.css"; // Importing CSS module for styling
import CustomModal from "../../components/Modal/Modal"; // Importing CustomModal component
import TaskForm from "../Form/TaskForm"; // Importing TaskForm component
import axios from "axios"; // Importing Axios for HTTP requests
import { toast } from "react-toastify"; // Importing react-toastify for toast notifications
import CustomSelect from "../../components/Select/select"; // Importing CustomSelect component

const TodoList = () => {
  const [originalTaskList, setOriginalTaskList] = useState([]); // State for original task list from server
  const [taskList, setTaskList] = useState([]); // State for displayed task list
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal open/close

  // Function to open modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to confirm modal action
  const confirmModal = () => {
    setModalOpen(false);
  };

  // Function to fetch todo list from server
  const getTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todo/list"); // GET request to fetch todo list
      if (response?.data?.statusCode === 200) {
        // If request is successful (status code 200)
        setTaskList(response?.data?.data); // Update taskList state with fetched data
        setOriginalTaskList(response?.data?.data); // Update originalTaskList state with fetched data
      } else {
        // If request is not successful
        toast.warning(response?.data?.message, {
          position: "top-right", // Display warning toast notification
        });
      }
    } catch (error) {
      console.log(error, "error"); // Log error to console
      toast.error("Something went wrong while fetching todo items!!", {
        position: "top-right", // Display error toast notification
      });
    }
  };

  // Function called when data is successfully saved (after add/update)
  const dataSaveSuccess = () => {
    getTodoList(); // Refresh todo list after data is saved
    setModalOpen(false); // Close the modal
  };

  // Function to filter tasks based on status
  const onChangeStatus = (event: any) => {
    if (event.target.value === "all") {
      setTaskList(originalTaskList); // Display all tasks if "all" is selected
      return;
    }
    const filteredList = originalTaskList.filter((item: any) => {
      return item?.status === event.target.value; // Filter tasks by selected status
    });
    setTaskList(filteredList); // Update taskList state with filtered list
  };

  useEffect(() => {
    getTodoList(); // Fetch todo list when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <>
      {/* Action div with Add Task button and status filter */}
      <div className={styles.actionDiv}>
        <div>
          <button onClick={openModal} className={styles.btn}>
            Add Task
          </button>
        </div>
        <CustomSelect onChange={onChangeStatus} />{" "}
        {/* CustomSelect component for status filter */}
      </div>

      {/* Todo list table */}
      <div className={styles.table}>
        {/* Table header */}
        <div className={styles.header}>
          <div className={styles.title}>Title</div>
          <div className={styles.desc}>Description</div>
          <div className={styles.status}>Status</div>
          <div className={styles.action}>Action</div>
        </div>

        {/* Table data */}
        <div className={styles.data}>
          {/* Conditionally render task rows or "No data found" message */}
          {taskList.length > 0 ? (
            taskList.map((item: any) => {
              return (
                <div className={styles.rowItem} key={item?._id}>
                  {/* Render TodoItemRow component for each task */}
                  <TodoItemRow item={item} dataSaveSuccess={dataSaveSuccess} />
                </div>
              );
            })
          ) : (
            <span className={styles.noDataMessage}>No data found!!</span>
          )}
        </div>
      </div>

      {/* Modal for TaskForm */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmModal}
        title="Task Form Modal"
        hideFooter={true} // Hide modal footer for TaskForm
      >
        {/* Render TaskForm component inside modal */}
        <TaskForm dataSaveSuccess={dataSaveSuccess} />
      </CustomModal>
    </>
  );
};

export default TodoList; // Export TodoList component
