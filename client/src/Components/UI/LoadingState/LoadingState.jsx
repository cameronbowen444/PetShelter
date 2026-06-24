import styles from "./LoadingState.module.css";

const LoadingState = ({
  title = "Loading...",
  message = "Please wait while we get everything ready.",
}) => {
  return (
    <div className={styles.loadingState}>
      <div className={styles.spinnerWrap}>
        <div className={styles.spinner}></div>
        <span>🐾</span>
      </div>

      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default LoadingState;