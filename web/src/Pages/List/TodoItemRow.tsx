import { Edit3, Trash } from "react-feather"; // Importing icons from react-feather
import styles from "./todoitemrow.module.css"; // Importing CSS module for styling
import CustomModal from "../../components/Modal/Modal"; // Importing CustomModal component
import TaskForm from "../Form/TaskForm"; // Importing TaskForm component
import { useState } from "react"; // Importing useState hook
import axios from "axios"; // Importing Axios for HTTP requests
import { toast } from "react-toastify"; // Importing react-toastify for toast notifications
import { G_STATUS_OBJECT } from "../../Utils/utils"; // Importing utility function for status object

const TodoItemRow = (props: any) => {
  const { item, dataSaveSuccess } = props; // Destructuring props to get item and dataSaveSuccess function
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal open/close
  const [editData, setEditData] = useState<any>({}); // State to store data for editing

  // Function to handle deletion of a task
  const onDelete = async (id: any) => {
    try {
      const res = await axios.post("http://localhost:5000/todo/remove", {
        _id: id,
      }); // POST request to delete task by id
      if (res?.data?.statusCode === 200) {
        dataSaveSuccess(); // Refresh task list after successful deletion
        toast.success(res?.data?.message, {
          position: "top-right", // Display success toast notification
        });
      } else {
        toast.warning(res?.data?.message, {
          position: "top-right", // Display warning toast notification if deletion fails
        });
      }
    } catch (error) {
      console.log(error, "error"); // Log error to console
      toast.error("Something went wrong while removing item!!", {
        position: "top-right", // Display error toast notification if request fails
      });
    }
  };

  // Function to open modal for editing task
  const openModal = (data: any) => {
    setModalOpen(true); // Set modal state to open
    setEditData(data); // Set editData state with task data to be edited
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false); // Set modal state to closed
  };

  // Function to confirm modal action (after editing or adding task)
  const confirmModal = () => {
    setModalOpen(false); // Set modal state to closed
    dataSaveSuccess(); // Refresh task list after data is saved
  };

  return (
    <>
      {/* Display task item details */}
      <div className={styles.title}>{item?.title}</div>
      <div className={styles.desc}>{item?.desc}</div>
      <div className={styles.status}>{G_STATUS_OBJECT[item?.status].value}</div>
      <div className={styles.action}>
        {/* Edit button */}
        <div onClick={() => openModal(item)} className={styles.actionButton}>
          <Edit3 size={18} />
        </div>
        {/* Delete button */}
        <div
          onClick={() => onDelete(item?._id)}
          className={styles.actionButton}
        >
          <Trash size={18} color="red" />
        </div>
      </div>

      {/* Modal for editing task */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmModal}
        title="Edit task"
        hideFooter={true} // Hide modal footer for TaskForm
      >
        {/* Render TaskForm component inside modal for editing task */}
        <TaskForm dataSaveSuccess={confirmModal} editData={editData} />
      </CustomModal>
    </>
  );
};

export default TodoItemRow; // Export TodoItemRow component
