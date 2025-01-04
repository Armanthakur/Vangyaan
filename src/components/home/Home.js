import React, { useContext } from "react";
import styles from "./style.module.css";
import simg from "./search.png";
import timg from "./t2.png";
import sample1 from "./l1.jpg";
import sample2 from "./l2.jpg";
import sample3 from "./l3.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext.js";

function Home({ theme }) {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim().length > 0) {
      navigate("/showposts", { state: { searchText: e.target.value.trim() } });
    }
  };

  return (
    <div className={styles.t}>
      {/* Header Section */}
      <div
        style={
          theme === "light"
            ? { backgroundColor: "rgb(250, 239, 223)" }
            : { backgroundColor: "black" }
        }
        className={styles.container1}
      >
        <div
          style={
            theme === "light"
              ? { color: "rgb(0, 130, 130)" }
              : { color: "white" }
          }
          className={styles.left}
        >
          <p>To plant a garden is to believe in Tomorrow</p>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Enter text to search"
              onKeyDown={handleSearch}
            />
            <a>
              <img src={simg} alt="Search" />
            </a>
          </div>
        </div>
        <img className={styles.timg} src={timg} alt="Header" />
        <div className={styles.right}></div>
      </div>

      {/* Core Services Section */}
      <div className={styles.container2}>
        <p className={styles.cardT}>
          Our core <span id="pp">Services</span>
        </p>
        <div className={styles.cardContainer}>
          <div className={styles.card1}>
            <img src={sample1} alt="Contribute" />
            <div className={styles.infoSection}>
              <h1
                onClick={() =>
                  isLoggedIn ? navigate("/upload") : navigate("/login")
                }
              >
                Contribute
              </h1>
              <h2>
                If you want to give your valuable contribution, then this is
                the right place
              </h2>
            </div>
          </div>
          <div className={styles.card2}>
            <img src={sample2} alt="Show Posts" />
            <div className={styles.infoSection}>
              <h1
                onClick={() =>
                  isLoggedIn ? navigate("/showposts") : navigate("/login")
                }
              >
                Show Posts
              </h1>
              <h2>
                Explore the world of greenery with our latest series, offering
                extensive plant identification
              </h2>
            </div>
          </div>
          <div className={styles.card3}>
            <img src={sample3} alt="Dashboard" />
            <div className={styles.infoSection}>
              <h1
                onClick={() =>
                  isLoggedIn ? navigate("/dashboard") : navigate("/login")
                }
              >
                Dashboard
              </h1>
              <h2>
                Effortlessly monitor plant identification, contributors, and
                moderators with our streamlined dashboard
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className={styles.footer}>
        <p>&copy; 2024 Plantify. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Home;
