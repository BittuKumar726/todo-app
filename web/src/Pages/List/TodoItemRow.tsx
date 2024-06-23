import { Edit3, Trash } from "react-feather";
import styles from "./todoitemrow.module.css";
import CustomModal from "../../components/Modal/Modal";
import TaskForm from "../Form/TaskForm";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { G_STATUS_OBJECT } from "../../Utils/utils";

const TodoItemRow = (props: any) => {
  const { item, dataSaveSuccess } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>({});

  const onDelete = async (id: any) => {
    try {
      const res = await axios.post("http://localhost:5000/todo/remove", {
        _id: id,
      });
      if (res?.data?.statusCode === 200) {
        dataSaveSuccess();
        toast.success(res?.data?.message, {
          position: "top-right",
        });
      } else {
        toast.warning(res?.data?.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Something went wrong while removing item!!", {
        position: "top-right",
      });
    }
  };
  const openModal = (data: any) => {
    setModalOpen(true);
    setEditData(data);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmModal = () => {
    setModalOpen(false);
    dataSaveSuccess();
  };
  return (
    <>
      <div className={styles.title}>{item?.title}</div>
      <div className={styles.desc}>{item?.desc}</div>
      <div className={styles.status}>{G_STATUS_OBJECT[item?.status].value}</div>
      <div className={styles.action}>
        <div onClick={() => openModal(item)} className={styles.actionButton}>
          <Edit3 size={18} />
        </div>
        <div
          onClick={() => onDelete(item?._id)}
          className={styles.actionButton}
        >
          <Trash size={18} color="red" />
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmModal}
        title="Custom Modal Title"
        hideFooter={true}
      >
        <TaskForm dataSaveSuccess={confirmModal} editData={editData} />
      </CustomModal>
    </>
  );
};

export default TodoItemRow;
