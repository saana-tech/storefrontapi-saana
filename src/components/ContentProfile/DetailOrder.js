import React from "react";
import PropTypes from "prop-types";
import util from "../../util";
import styles from "./ContentProfile.module.css";
//import { gql, useQuery } from "@apollo/client";

const DetailOrder = ({ order }) => {
  /*   const GET_COLLECTIONS = gql`
    {
      shop {
        name
      }
      order(id:"${orderId}") {
        confirmed
     
    
      }
    }
  `;
  const { data = null, loading = false, error = null } = useQuery(
    GET_COLLECTIONS
  );
 */
  console.log("order =>", order);
  const { products } = order;
  return (
    <div className={styles.containerModalDetailOrder}>
      <div className={styles.containerProducts}>
        <h3>Listado de productos</h3>
        {products &&
          products.length > 0 &&
          products.map(({ node }, index) => {
            const { title, quantity, variant } = node;
            console.log("variant =Z>", variant);
            return (
              <div key={index} className={styles.cardProductOrder}>
                <div className={styles.imgProductOrder}>
                  <img src={variant?.image?.src} alt={title} />
                </div>
                <div className={styles.priceAndQuantity}>
                  <h4>{title}</h4>
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
          <h4>Fecha de creación</h4>
          <span>{util.dateFormat(order.processedAt)}</span>
        </div>{" "}
        <div className={styles.informationSidebar}>
          <h4>Cantidad de productos</h4>
          <span>{products.length}</span>
        </div>{" "}
        <div className={styles.informationSidebar}>
          <h4>Estado de pago</h4>
          <span>{"Esperando"}</span>
        </div>
        <div className={styles.informationSidebar}>
          <h4>Dirección de entrega</h4>
          <span>Ak 86 #44-25</span>
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
