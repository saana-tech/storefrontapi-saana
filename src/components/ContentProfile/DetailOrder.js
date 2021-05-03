import React from "react";
import PropTypes from "prop-types";
import util from "../../util";
import styles from "./ContentProfile.module.css";
//import { gql, useQuery } from "@apollo/client";

const DetailOrder = ({ order }) => {
  const { products } = order;
  console.log("order =>", order);
  return (
    <div className={styles.containerModalDetailOrder}>
      <div className={styles.containerProducts}>
        <h3>Listado de productos</h3>
        {products &&
          products.length > 0 &&
          products.map(({ node }, index) => {
            const { title, quantity, variant } = node;
            return (
              <div key={index} className={styles.cardProductOrder}>
                <div className={styles.imgProductOrder}>
                  <img src={variant?.image?.src} alt={title} />
                </div>
                <div className={styles.priceAndQuantity}>
                  <h4 className={styles.titleProduct}>{title}</h4>
                  <span>Cantidad: {quantity}</span>
                  <span>
                    precio{"/(U)"}: {util.formatCOP(variant?.price)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.containerInformation}>
        <h3>Detalles de compra</h3>
        <div className={styles.informationSidebar}>
          <h4>ID</h4>
          <span>
            {"#"}
            {order.id}
          </span>
        </div>{" "}
        <div className={styles.informationSidebar}>
          <h4>Fecha de creación</h4>
          <span>{util.dateFormat(order.processedAt)}</span>
        </div>{" "}
        <div className={styles.informationSidebar}>
          <h4>Cantidad de productos</h4>
          <span>{products.length}</span>
        </div>{" "}
        <div className={styles.informationSidebar}>
          <h4>Dirección de entrega</h4>
          <span>{order?.address}</span>
        </div>
        <div className={styles.informationSidebar}>
          <h4>Total</h4>
          <span>{util.formatCOP(order.totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};
DetailOrder.propTypes = {
  order: PropTypes.object,
};
export default DetailOrder;
