import React, { useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";

import {
  FaOdnoklassnikiSquare,
  FaFacebook,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const icons = {
  facebook: FaFacebook,
  ok: FaOdnoklassnikiSquare,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

function Social({ data }) {
  const computedData = useMemo(() => {
    return data
      ?.map((el) => ({
        ...el,
        icon: icons[el.name],
      }))
      .filter((el) => el.icon);
  }, [data]);

  return (
    <div>
      {computedData.map((el) => (
        <Checkbox
          key={el.id}
          {...label}
          icon={<el.icon size={25} />}
          checkedIcon={
            <Favorite style={{ color: "blue", fontSize: "1.5em" }} />
          }
        />
      ))}
    </div>
  );
}

export default Social;
