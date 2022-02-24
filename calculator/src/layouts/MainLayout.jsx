import { Typography } from "@mui/material";
import { Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessengerCheckbox,
  SocialCheckbox,
} from "../components/CheckboxCalc/CheckboxCalc";

import "./style.scss";
import StepperCalc from "../components/StepperCalc/StepperCalc";
import BtnAdd from "../components/BtnAdd/BtnAdd";

import Loader from "../components/Loader";
import Subtitle from "../components/Subtitle";

import { fetchRates, calculateTotalPrice } from "../store/slices/ratesSlice";

const MainLayout = () => {
  const rates = useSelector((state) => state.ratesReducer.ratesList);
  const status = useSelector((state) => state.ratesReducer.status);
  const totalPrice = useSelector((state) => state.ratesReducer.totalPrice);
  const selectedRates = useSelector((state) => state.ratesReducer.addedRates);
  const discountAmount = useSelector(
    (state) => state.ratesReducer.discountAmount
  );

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

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
      <div className="main-info_header common-padding">
        <h1>Настройте тариф :)</h1>
        <Subtitle title={rates.minutes_title}>
          <p>{rates.minutes_descr}</p>
          <p> {rates.minutes_subdescr}</p>
        </Subtitle>
      </div>

      <StepperCalc data={rates.minutes} val="мин" />
      <div className="btn-conditional common-padding">
        <BtnAdd onOpen={handleOpen} open={open}></BtnAdd>
        <Typography variant="p" className="subinfo">
          Используйте вместе с тарифом
        </Typography>
      </div>

      <Collapse
        in={open}
        timeout={{
          enter: 300,
          exit: 200,
        }}
      >
        <StepperCalc data={rates.sms} val="смс" />
      </Collapse>

      <div className="main-info_header common-padding">
        <Subtitle title={rates.internet_title} />
      </div>
      <StepperCalc data={rates.internet} val="ГБ" />

      <div className="common-padding">
        <SocialCheckbox data={rates.social} />
        <MessengerCheckbox data={rates.messenger} />
      </div>
      <div className="price_total common-padding">{totalPrice} P/мес</div>
    </div>
  );
};

export default MainLayout;
