import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import { StoreContext } from "../../core";
import styles from "./ContentProfile.module.css";

const Orders = () => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { user } = globalState;
  let orders = user && user.orders && user.orders.edges;
  console.log("order =>", orders);

  return (
    <div>
      <div>
        <h3 className={styles.title}>¡Mis Ordenes!</h3>
      </div>

      <div className={styles.containerTablet}>
        <table>
          <tr>
            <th>d</th>
            <th>Last_Name</th>
            <th>Marks</th>
          </tr>
          <tr>
            <td>Sonoo</td>
            <td>Jaiswal</td>
            <td>60</td>
          </tr>
          <tr>
            <td>James</td>
            <td>William</td>
            <td>80</td>
          </tr>
          <tr>
            <td>Swati</td>
            <td>Sironi</td>
            <td>82</td>
          </tr>
          <tr>
            <td>Chetna</td>
            <td>Singh</td>
            <td>72</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Orders;
