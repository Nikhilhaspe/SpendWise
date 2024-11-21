import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.container}>
      <h3>
        Made with 💖 by &nbsp;
        <a
          className={styles.nameNavLink}
          href="https://github.com/Nikhilhaspe"
          target="_blank"
        >
          Nikhil Haspe.
        </a>
      </h3>
    </footer>
  );
}

export default Footer;
