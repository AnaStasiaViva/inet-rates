import React from "react";

import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";

import {
  FaOdnoklassnikiSquare,
  FaFacebook,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Social({ key }) {
  const icons = [
    <FaFacebook size={25} />,
    <FaOdnoklassnikiSquare size={25} />,
    <FaInstagram size={25} />,
    <FaTiktok size={25} />,
  ];

  return (
    <div>
      {icons.map((icon) => (
        <Checkbox
          key={key}
          {...label}
          icon={icon}
          checkedIcon={
            <Favorite style={{ color: "blue", fontSize: "1.5em" }} />
          }
        />
      ))}
    </div>
  );
}

export default Social;
