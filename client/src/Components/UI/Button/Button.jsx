import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({
  children,
  to,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) => {
  const buttonClass = `${styles.btn} ${styles[variant] || styles.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;