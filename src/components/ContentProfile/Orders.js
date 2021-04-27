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
                <td scope="col">Productos</td>
                <th scope="col">Total</th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.map(({ node }) => {
                  const { totalPrice, lineItems, processedAt, id } = node;
                  const products = lineItems.edges;
                  return (
                    <tr key={id}>
                      <td data-label="Pedido">
                        <a
                          onClick={() =>
                            handleOrder({
                              id,
                              products,
                              processedAt,
                              totalPrice,
                            })
                          }
                          className={styles.linkOrder}
                        >
                          {id.slice(1, 5)}
                        </a>
                      </td>
                      <td data-label="Fecha">{util.dateFormat(processedAt)}</td>
                      <td data-label="Cantidad">{products.length}</td>
                      <td data-label="Total">{util.formatCOP(totalPrice)}</td>
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
