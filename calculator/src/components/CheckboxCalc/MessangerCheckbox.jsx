import React, { useMemo } from "react";

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

const icons = {
  whatsapp: FaWhatsapp,
  viber: FaViber,
  telegram: FaTelegramPlane,
  discord: FaDiscord,
};

function Messenger({ data }) {
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
      {computedData.map((el) => {
        return (
          <Checkbox
            key={el.id}
            {...label}
            icon={<el.icon size={25} />}
            checkedIcon={<BookmarkIcon />}
          />
        );
      })}
    </div>
  );
}

export default Messenger;
