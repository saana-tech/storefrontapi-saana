import React from "react";
import Skeleton from "react-loading-skeleton";

import styles from "./Collections.module.css";

const LoadingCollections = () => {
  return (
    <div className={styles.containerLoading}>
      <div>
        <Skeleton
          width={164}
          height={197}
          count={7}
          style={{ margin: "0 0.5rem" }}
        />
      </div>
    </div>
  );
};

export default LoadingCollections;
