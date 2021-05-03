import React, { useContext, useState } from "react";
import { StoreContext } from "../../core";
import styles from "./ContentProfile.module.css";
import util from "../../util";
import Modal from "../Modal";
import DetailOrder from "./DetailOrder";

const Orders = () => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { user } = globalState;
  let orders = user && user.orders && user.orders.edges;

  const [modalOrder, setModalOrder] = useState(false);
  const [orderItem, setOrderItem] = useState(null);
  const handleOrder = (id) => {
    setOrderItem(id);
    setModalOrder(true);
  };
  return (
    <>
      <div>
        <div>
          <h3 className={styles.title}>¡Mis Ordenes!</h3>
        </div>

        <div className={styles.containerTablet}>
          <table>
            <thead>
              <tr>
                <th scope="col">Pedido</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado de pago</th>
                <th scope="col">Productos</th>
                <th scope="col">Estado de compra</th>

                <th scope="col">Total</th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.map(({ node }) => {
                  console.log("node order =>", node);
                  <td data-label="Estado de pago">
                    {util.dateFormat(processedAt)}
                  </td>;
                  const {
                    totalPrice,
                    lineItems,
                    processedAt,
                    id,
                    fulfillmentStatus,
                    financialStatus,
                    orderNumber,
                  } = node;

                  const products = lineItems.edges;
                  return (
                    <tr key={id}>
                      <td data-label="Pedido">
                        <a
                          onClick={() =>
                            handleOrder({
                              totalPrice,
                              lineItems,
                              processedAt,
                              id: orderNumber,
                              fulfillmentStatus,
                              financialStatus,
                              orderNumber,
                              address: node?.shippingAddress?.address1,
                              products,
                            })
                          }
                          className={styles.linkOrder}
                        >
                          {"#"}
                          {orderNumber}
                        </a>
                      </td>
                      <td data-label="Fecha">{util.dateFormat(processedAt)}</td>
                      <td data-label="Estado de pago">
                        {financialStatus === "PENDING" && (
                          <span className={styles.estatusPending}>
                            Pendiente
                          </span>
                        )}
                      </td>
                      <td data-label="Cantidad">{products.length}</td>
                      <td data-label="Estado de orden">
                        {fulfillmentStatus === "UNFULFILLED" && (
                          <span className={styles.statusOrder}>Esperando</span>
                        )}
                      </td>
                      <td data-label="Total">
                        <span className={styles.totalTablet}>
                          {util.formatCOP(totalPrice)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={modalOrder} close={setModalOrder}>
        <DetailOrder order={orderItem} />
      </Modal>
    </>
  );
};

export default Orders;
