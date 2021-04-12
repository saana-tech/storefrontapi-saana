import React from "react";
import PropTypes from "prop-types";
import styles from "./Products.module.css";
import util from "../../util";

const CardProduct = ({ product, handleProduct }) => {
  const { imageUrl, title, price } = product;
  return (
    <div className={styles.card}>
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
    </div>
  );
};
CardProduct.propTypes = {
  product: PropTypes.object,
  handleProduct: PropTypes.func,
};

export default CardProduct;
