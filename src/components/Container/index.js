import React from "react";
import PropTypes from "prop-types";
import styles from "./Container.module.css";

const Container = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.col1} />
      <div className={styles.col2}>{children}</div>
      <div className={styles.col3} />
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default Container;
