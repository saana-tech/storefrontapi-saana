import React from "react";
import PropTypes from "prop-types";
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
ContentProfile.propTypes = {
  path: PropTypes.string,
};
export default ContentProfile;
