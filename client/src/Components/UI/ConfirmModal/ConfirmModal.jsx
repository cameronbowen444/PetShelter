import Button from "../Button/Button";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  loadingText = "Working...",
  cancelText = "Cancel",
  variant = "primary",
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>
          {isLoading ? <div className={styles.miniSpinner}></div> : "🐾"}
        </div>

        <h3>{title}</h3>
        <p>{message}</p>

        {isLoading && (
          <p className={styles.loadingMessage}>
            Please wait while we update the shelter list.
          </p>
        )}

        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>

          <Button variant={variant} onClick={onConfirm} disabled={isLoading}>
            {isLoading ? loadingText : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;