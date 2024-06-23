// Importing necessary libraries and styles
import { XCircle } from "react-feather"; // Assuming you have react-feather installed for the XCircle icon
import styles from "./Modal.module.css"; // Assuming you have CSS modules set up for styling

// Interface defining props for CustomModal component
interface CustomModalProps {
  isOpen: boolean; // Indicates if the modal is open
  onClose: () => void; // Function to close the modal
  onConfirm: () => void; // Function to confirm an action
  title: string; // Title of the modal
  children: React.ReactNode; // Content of the modal body
  hideFooter: boolean; // Flag to hide the modal footer
}

// CustomModal functional component
const CustomModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  hideFooter = false,
}: CustomModalProps) => {
  // If modal is not open, return null (i.e., don't render anything)
  if (!isOpen) {
    return null;
  }

  // Render the modal
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <div></div> {/* Placeholder for additional header content */}
          <div>
            <h3>{title}</h3>
          </div>{" "}
          {/* Modal title */}
          <span className={styles.closeBtn}>
            {/* Close button with XCircle icon */}
            <button className={styles.close_btn} onClick={onClose}>
              <XCircle />
            </button>
          </span>
        </div>
        <div className={styles.modal_body}>{children}</div>{" "}
        {/* Modal body content */}
        {/* Modal footer if hideFooter is false */}
        {!hideFooter && (
          <div className={styles.modal_footer}>
            {/* Confirm button */}
            <button className={styles.modal_btn} onClick={onConfirm}>
              Confirm
            </button>
            {/* Cancel button */}
            <button className={styles.modal_btn} onClick={onClose}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModal; // Exporting the CustomModal component
