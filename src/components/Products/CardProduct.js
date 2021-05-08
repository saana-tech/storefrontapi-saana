import React from "react";
import PropTypes, { number } from "prop-types";
import { motion } from "framer-motion";

import styles from "./Products.module.css";
import util from "../../util";

const CardProduct = ({ product, handleProduct, index }) => {
  const { imageUrl, title, price } = product;
  const delay = parseFloat("0." + index + 2);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay,
            },
          },
        }}
        key={index}
        className={styles.card}
        onClick={() => handleProduct(product)}
      >
        <div className={styles.imgProduct}>
          <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.information}>
          <h2>{title}</h2>
          <h3>{util.formatCOP(price)}</h3>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleProduct(product)}>AGREGAR</button>
        </div>
      </motion.div>
    </>
  );
};
CardProduct.propTypes = {
  product: PropTypes.object,
  handleProduct: PropTypes.func,
  lastProduct: number,
  index: number,
};

export default CardProduct;
