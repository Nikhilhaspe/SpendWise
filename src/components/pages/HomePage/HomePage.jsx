// library import
import { useNavigate } from "react-router-dom";

// components
import Footer from "../../Footer/Footer.component";

// css module
import styles from "./HomePage.module.css";

function HomePage() {
  // rrd
  const navigate = useNavigate();

  // event handlers
  function handleStartButtonClick() {
    navigate("/app");
  }

  return (
    <div className={styles.container}>
      <h1>
        Welcome, to <span className={styles.appName}>SpendWise</span> App
      </h1>
      <h3>👋 Track your daily expenses and much more! 💵</h3>

      <button onClick={handleStartButtonClick} className={styles.startBtn}>
        Explore Now
      </button>

      <Footer />
    </div>
  );
}

export default HomePage;
