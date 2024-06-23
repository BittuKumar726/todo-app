// src/CustomModal.js
import { XCircle } from "react-feather";
import styles from "./Modal.module.css";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  hideFooter: boolean;
}

const CustomModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  hideFooter = false,
}: CustomModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <div></div>
          <div>{title}</div>
          <span className={styles.closeBtn}>
            <button className={styles.close_btn} onClick={onClose}>
              <XCircle />
            </button>
          </span>
        </div>
        <div className={styles.modal_body}>{children}</div>
        {!hideFooter && (
          <div className={styles.modal_footer}>
            <button className={styles.modal_btn} onClick={onConfirm}>
              Confirm
            </button>
            <button className={styles.modal_btn} onClick={onClose}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModal;
