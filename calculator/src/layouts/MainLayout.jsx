import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessengerCheckbox,
  SocialCheckbox,
} from "../components/CheckboxCalc/CheckboxCalc";

import "./style.scss";
import StepperCalc from "../components/StepperCalc/StepperCalc";
import BtnAdd from "../components/BtnAdd/BtnAdd";
import CustomizedSlider from "../components/SliderCalc/SliderCalc";
import axios from "axios";
import Loader from "../components/Loader";
import Subtitle from "../components/Subtitle";

import { fetchRates, calculateTotalPrice } from "../store/slices/ratesSlice";

const MainLayout = () => {
  const rates = useSelector((state) => state.ratesReducer.ratesList);
  const status = useSelector((state) => state.ratesReducer.status);
  const totalPrice = useSelector((state) => state.ratesReducer.totalPrice);
  const selectedRates = useSelector((state) => state.ratesReducer.addedRates);

  const discount = useSelector((state) => state.ratesReducer.discount);

  //console.log(selectedRates, "selected redux selectedRates");
  //console.log("total price ===", totalPrice);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => (open ? setOpen(false) : setOpen(true));

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [selectedRates]);

  return (
    <div className="MainLayout">
      {status && status === "loading" && <Loader />}
      <div className="main-info_header">
        <h1>Настройте тариф</h1>
        <Subtitle
          title={rates.minutes_title}
          descr={rates.minutes_descr}
          subdescr={rates.minutes_subdescr}
        />
      </div>

      <StepperCalc data={rates.minutes} val="мин" />
      <div className="btn-conditional">
        <BtnAdd onOpen={handleOpen} open={open}></BtnAdd>
        <p>Используйте вместе с тарифом</p>
      </div>
      {open && <StepperCalc data={rates.sms} val="смс" />}

      <div className="main-info_header">
        <Subtitle title={rates.internet_title} />
      </div>
      <StepperCalc data={rates.internet} val="ГБ" />

      <SocialCheckbox data={rates.social} />
      <MessengerCheckbox data={rates.messenger} />
      <div className="price_total">{totalPrice} P/мес</div>
    </div>
  );
};

export default MainLayout;
