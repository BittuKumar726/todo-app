import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
// import { TaskContext } from '../context/TaskContext';
import styles from "./task.module.css"; // Import the CSS file

interface TaskFormValues {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

const TaskForm = () => {
  // const { addTask } = useContext(TaskContext)!;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    // addTask(data);
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
        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <input {...field} className={styles.formControl} />
          )}
        />
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
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
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
