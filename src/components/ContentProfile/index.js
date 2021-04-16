import React from "react";
import Address from "./Address";
import Orders from "./Orders";

const ContentProfile = ({ path }) => {
  return (
    <div>
      {path === "Mis Ordenes" && <Orders />}
      {path === "Mis Direcciones" && <Address />}
    </div>
  );
};

export default ContentProfile;
