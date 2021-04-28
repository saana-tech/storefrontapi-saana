import React from "react";
import PropTypes from "prop-types";
import styles from "./Section.module.css";

const Section = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};
Section.propTypes = {
  children: PropTypes.object,
};

export default Section;
