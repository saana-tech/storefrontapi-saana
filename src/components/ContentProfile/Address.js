import React, { useContext, useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import IconDelete from "../../../public/static/svg/IconDelete";
import { StoreContext } from "../../core";
import styles from "./ContentProfile.module.css";
import { deleteAddressCustomer } from "../../graphql/gql";
import Modal from "../Modal";

const Address = () => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { user } = globalState;
  const address = user?.addresses?.edges;

  const [token, setToken] = useState("");
  const [itemAddress, setItemAddress] = useState("");
  const [modalDelete, setModalDelete] = useState(false);

  const customerTokenQuery = gql`
  query customer {
  customer(customerAccessToken: "${token}") {
    email
    displayName
    id
  addresses(first: 5) {
      edges {
        node {
        id
        address1
        city
        country
        }
      }
    }
    orders(first: 5) {
      edges {
        node {
          lineItems(first: 5) {
            edges {
              node {
                quantity
                title
                variant {
                  image {
                    src
                  }
                  price
                  sku
                }
              }
            }
          }
          id
          currencyCode
          totalTax
          totalPrice
          subtotalPrice
          processedAt
          
         
        }
      }
    }
    defaultAddress {
      address1
    }

  }
}
`;

  const [deleteAddressMutation] = useMutation(deleteAddressCustomer, {
    update(cache) {
      let currentCustomer;

      const { customer } = cache.readQuery({
        query: customerTokenQuery,
        variables: {
          input: {
            customerAccessToken: token,
          },
        },
      });
      currentCustomer = customer;
      const result = customer.addresses.edges.filter(
        (a) => a.node.id !== itemAddress.id
      );

      currentCustomer = {
        ...customer,
        addresses: {
          edges: result,
          __typename: "MailingAddressConnection",
        },
      };

      cache.writeQuery({
        query: customerTokenQuery,
        variables: {
          input: {
            customerAccessToken: token,
          },
        },
        data: {
          customer: currentCustomer,
        },
      });
    },
  });

  const handleModalRemove = (paramsAddress) => {
    setModalDelete(true);
    setItemAddress(paramsAddress);
  };

  const handleDeleteAddress = async () => {
    const input = {
      customerAccessToken: token,
      id: itemAddress.id,
    };
    try {
      await deleteAddressMutation({ variables: input });
      setModalDelete(false);
    } catch (error) {
      console.log("error =>", error);
    }
  };

  const handleToken = () => {
    setToken(localStorage.getItem("token"));
  };

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <div>
      <div>
        <h3 className={styles.title}>¡Mis Direcciones!</h3>
      </div>
      <div className={styles.containerTablet}>
        <table>
          <thead>
            <tr>
              <th scope="col">Dirección</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>

          <tbody>
            {address &&
              address.length > 0 &&
              address.map(({ node }) => {
                return (
                  <tr key={node.id}>
                    <td data-label="Pedido">{node.address1}</td>
                    <td data-label="Ciudad">{node.city}</td>
                    <td data-label="Opciones">
                      <a onClick={() => handleModalRemove(node)}>
                        <IconDelete />
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal open={modalDelete} close={setModalDelete} width={400} height={150}>
        <div className={styles.containerMsn}>
          <span>Realmente deseas eliminar esta dirección</span>
          <div className={styles.containerBtnsClose}>
            <button onClick={() => setModalDelete(false)}>Cancelar</button>
            <button onClick={() => handleDeleteAddress()}>Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Address;
