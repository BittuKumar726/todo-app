import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form"; // Importing useForm and Controller from react-hook-form
import styles from "./taskform.module.css"; // Importing CSS module for styling
import axios from "axios"; // Importing Axios for making HTTP requests
import { toast } from "react-toastify"; // Importing react-toastify for displaying toast notifications
import CustomSelect from "../../components/Select/select"; // Importing CustomSelect component

interface TaskFormValues {
  _id?: string;
  title: string;
  desc: string;
  status: "todo" | "inprogress" | "done";
}
interface TaskFormProps {
  dataSaveSuccess: () => void; // Callback function for successful data save
  editData?: TaskFormValues; // Optional prop for pre-filled form data in edit mode
}

const TaskForm = ({ dataSaveSuccess, editData }: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Function to set form field values manually
  } = useForm<TaskFormValues>({
    defaultValues: {
      _id: "", // Default values for form fields
      title: "",
      desc: "",
      status: "todo",
    },
  });

  useEffect(() => {
    // Effect to set form values when editData changes
    if (editData) {
      setValue("_id", editData._id); // Set _id field
      setValue("title", editData.title); // Set title field
      setValue("desc", editData.desc); // Set desc field
      setValue("status", editData.status); // Set status field
    }
  }, [editData, setValue]); // Dependency array ensures useEffect runs when editData changes

  const onSubmit = async (data: TaskFormValues) => {
    try {
      // Log form data
      console.log({ data });

      // Determine URL based on whether _id is present (for update) or not (for create)
      const url = data._id
        ? `http://localhost:5000/todo/update`
        : "http://localhost:5000/todo/save/form";

      // Make POST request to save or update task
      const response = await axios.post(url, data);

      // Handle response based on status code
      if (response?.data?.statusCode === 200) {
        dataSaveSuccess(); // Call callback function on successful save
        toast.success(response?.data?.message, {
          position: "top-right", // Position of toast notification
        });
      } else {
        toast.warning(response?.data?.message, {
          position: "top-right", // Position of toast notification
        });
      }

      reset(); // Reset form fields after submission
    } catch (error) {
      console.log(error, "error"); // Log error to console
      toast.error("Something went wrong while saving item!!", {
        position: "top-right", // Position of toast notification
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.taskForm}>
      {/* Title input field */}
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
      {/* Description input field */}
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
      {/* Status select dropdown */}
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
      {/* Submit button */}
      <button type="submit" className={styles.btn}>
        {editData ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm; // Export TaskForm component
