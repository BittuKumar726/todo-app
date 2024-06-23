import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./taskform.module.css"; // Import the CSS file
import axios from "axios";
import { toast } from "react-toastify";
import CustomSelect from "../../components/Select/select";

interface TaskFormValues {
  _id?: string;
  title: string;
  desc: string;
  status: "todo" | "inprogress" | "done";
}

interface TaskFormProps {
  dataSaveSuccess: () => void;
  editData?: TaskFormValues; // Change to match the TaskFormValues interface
}

const TaskForm = ({ dataSaveSuccess, editData }: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Add setValue to set form values manually
  } = useForm<TaskFormValues>({
    defaultValues: {
      _id: "", // Include _id in the defaultValues
      title: "",
      desc: "",
      status: "todo",
    },
  });

  useEffect(() => {
    if (editData) {
      setValue("_id", editData._id); // Set the _id value
      setValue("title", editData.title);
      setValue("desc", editData.desc);
      setValue("status", editData.status);
    }
  }, [editData, setValue]);

  const onSubmit = async (data: TaskFormValues) => {
    try {
      console.log({ data });

      // If _id is present, use PUT to update the existing task, otherwise use POST to create a new task
      const url = data._id
        ? `http://localhost:5000/todo/update`
        : "http://localhost:5000/todo/save/form";

      const response = await axios.post(url, data);

      if (response?.data?.statusCode === 200) {
        dataSaveSuccess();
        toast.success(response?.data?.message, {
          position: "top-right",
        });
      } else {
        toast.warning(response?.data?.message, {
          position: "top-right",
        });
      }

      reset();
    } catch (error) {
      console.log(error, "error");
      toast.error("Something went wrong while saving item!!", {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.taskForm}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <input
              {...field}
              className={`${styles.formControl} ${
                errors.title ? styles.isInvalid : ""
              }`}
            />
          )}
        />
        {errors.title && (
          <div className={styles.invalidFeedback}>{errors.title.message}</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="desc">Description</label>
        <Controller
          name="desc"
          rules={{ required: "Description is required" }}
          control={control}
          render={({ field }) => (
            <input {...field} className={styles.formControl} />
          )}
        />
        {errors.desc && (
          <div className={styles.invalidFeedback}>{errors.desc.message}</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="status">Status</label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <CustomSelect
              {...field}
              style={{ width: "150px" }}
              isTaskForm={true}
            />
          )}
        />
        {errors.status && (
          <div className={styles.invalidFeedback}>{errors.status.message}</div>
        )}
      </div>
      <button type="submit" className={styles.btn}>
        {editData ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
