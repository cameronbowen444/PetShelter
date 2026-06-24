import Button from "../Button/Button";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>🐾</div>

        <h3>{title}</h3>
        <p>{message}</p>

        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>

          <Button variant={variant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;