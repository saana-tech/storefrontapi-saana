import * as React from "react";
import PropTypes from "prop-types";

function IconCloseWhite(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20.953}
      height={20.953}
      viewBox="0 0 20.953 20.953"
      {...props}
    >
      <path
        data-name="Icon ionic-md-close"
        d="M20.954 2.096l-2.1-2.1-8.377 8.381L2.096 0l-2.1 2.1 8.381 8.377L0 18.858l2.1 2.1 8.377-8.381 8.381 8.381 2.1-2.1-8.381-8.381z"
        fill="#fff"
      />
    </svg>
  );
}
IconCloseWhite.protoTypes = {
  close: PropTypes.func,
};

export default IconCloseWhite;
