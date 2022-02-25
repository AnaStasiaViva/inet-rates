import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRates,
  removeSelectedCheckbox,
} from "../../store/slices/ratesSlice";

import Checkbox from "@mui/material/Checkbox";
import "./style.scss";
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
const iconsColor = {
  whatsapp: "green",
  viber: "darkviolet",
  telegram: "rgb(66, 150, 228)",
  discord: "rgb(95, 95, 235)",
};

function Messenger({ data }) {
  const addedRates = useSelector((state) => state.ratesReducer.addedRates);
  const dispatch = useDispatch();

  const onCheckIfItemWasAddedHandler = (id) => {
    return addedRates.some((rate) => rate.id === id);
  };

  const onCurrentStepHandler = (idx, item) => {
    const exist = onCheckIfItemWasAddedHandler(idx);
    if (exist) dispatch(removeSelectedCheckbox(idx));
    if (!exist) dispatch(addRates(item));
  };

  const computedData = useMemo(() => {
    return data
      ?.map((el) => ({
        ...el,
        icon: icons[el.name],
        color: iconsColor[el.name],
      }))
      .filter((el) => el.icon);
  }, [data]);

  return (
    <div className="Socials-wrapper">
      {computedData?.map((el) => {
        return (
          <div>
            <Checkbox
              key={el.id}
              {...label}
              icon={<el.icon size={25} />}
              onClick={() => onCurrentStepHandler(el.id, el)}
              checkedIcon={
                <el.icon
                  style={{
                    background: el.color,
                    color: "white",
                    borderRadius: "50%",
                  }}
                  size={25}
                />
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Messenger;
