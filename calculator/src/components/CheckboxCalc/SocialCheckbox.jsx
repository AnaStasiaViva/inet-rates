import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRates,
  removeSelectedCheckbox,
} from "../../store/slices/ratesSlice";

import Checkbox from "@mui/material/Checkbox";

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

const iconsColor = {
  facebook: "blue",
  ok: "orange",
  instagram: "rgb(205, 79, 221)",
  tiktok: "black",
};

function Social({ data }) {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const addedRates = useSelector((state) => state.ratesReducer.addedRates);

  const onCheckIfItemWasAddedHandler = (id) => {
    return addedRates.some((rate) => rate.id === id);
  };

  const onCurrentStepHandler = (idx, item) => {
    setIsChecked(true);
    //setAddedToStateIdx(idx);
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
      {computedData?.map((el, idx) => {
        return (
          <div className="socials-item">
            <Checkbox
              key={el.id}
              {...label}
              icon={<el.icon size={25} />}
              onClick={() => onCurrentStepHandler(el.id, el)}
              checkedIcon={<el.icon style={{ color: el.color }} size={25} />}
            />
            <span>{el.price} P</span>
          </div>
        );
      })}
    </div>
  );
}

export default Social;
