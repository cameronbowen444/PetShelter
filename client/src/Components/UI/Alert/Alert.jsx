import styles from "./Alert.module.css";

const Alert = ({ type = "success", title, message }) => {
  const icon = type === "error" ? "⚠️" : "✅";

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span>{icon}</span>

      <div>
        {title && <h4>{title}</h4>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Alert;