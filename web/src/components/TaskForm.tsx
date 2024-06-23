import { useForm, Controller } from "react-hook-form";
import styles from "./task.module.css"; // Import the CSS file
import axios from "axios";

interface TaskFormValues {
  title: string;
  desc: string;
  status: "To Do" | "In Progress" | "Done";
}

const TaskForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      desc: "",
      status: "To Do",
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    console.log({ data });
    const response = await axios.post(
      "http://localhost:5000/todo/save/form",
      data
    );
    console.log({ response });

    reset();
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
            <select
              {...field}
              className={`${styles.formControl} ${
                errors.status ? styles.isInvalid : ""
              }`}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          )}
        />
        {errors.status && (
          <div className={styles.invalidFeedback}>{errors.status.message}</div>
        )}
      </div>
      <button type="submit" className={styles.btn}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
