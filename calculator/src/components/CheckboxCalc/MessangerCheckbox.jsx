import React from "react";

import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import {
  FaViber,
  FaDiscord,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const icons = [
  <FaWhatsapp size={25} />,
  <FaViber size={25} />,
  <FaTelegramPlane size={25} />,
  <FaDiscord size={25} />,
];

function Messenger({ data }) {
  const merged = data && [data, icons];

  return (
    <div>
      {icons.map((icon) => {
        return (
          <Checkbox
            //key={key}
            {...label}
            icon={icon}
            checkedIcon={<BookmarkIcon />}
          />
        );
      })}
    </div>
  );
}

export default Messenger;
