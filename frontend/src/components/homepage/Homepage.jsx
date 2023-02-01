import React from "react";
import styles from "./Homepage.module.scss";

function HomePage() {
  return (
    <div className={styles["home-page"]}>
      <div className={styles["upper-container"]}>
        <div className={`${styles["upper-header"]} ${styles["slide-in"]}`}>
          Start your Night with
        </div>
      </div>
      <div className={styles["lower-container"]}>
        <div className={`${styles["lower-header"]} ${styles["slide-in"]}`}>
          Your Favorite <i>Cocktail</i>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
