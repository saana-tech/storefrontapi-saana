import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Product.module.css";

const Product = () => {
  const router = useRouter();
  let { product } = router.query;
  const productSelect = JSON.parse(product);
  const { title, price, description, imageUrl } = productSelect;

  console.log("id =>", productSelect);

  return (
    <div className="container">
      <div className={styles.headerProduct}>
        <div className={styles.col1}>
          <img src={imageUrl} alt={title} /> <img src={imageUrl} alt={title} />
          <img src={imageUrl} alt={title} /> <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.col2}>
          <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.col3}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.price}>${price}</h3>

          <button className={styles.btnAdd}>Agregar al carrito</button>
          <h3 className={styles.titleInformation}>Información nutricional</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
