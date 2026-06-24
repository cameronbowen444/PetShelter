import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbarWrap}>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.navbarBrand}>
          <span className={styles.navbarLogo}>🐾</span>

          <div className={styles.navbarBrandText}>
            <h1>Pet Shelter</h1>
            <p>Adopt. Love. Repeat.</p>
          </div>
        </NavLink>

        <div className={styles.navbarLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navbarLink} ${styles.active}`
                : styles.navbarLink
            }
          >
            Available Pets
          </NavLink>

          <NavLink
            to="/new"
            className={({ isActive }) =>
              isActive
                ? `${styles.navbarButton} ${styles.activeButton}`
                : styles.navbarButton
            }
          >
            Add Pet
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;