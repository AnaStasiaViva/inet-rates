import React, { useState } from "react";

import "./style.scss";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useDispatch, useSelector } from "react-redux";
import {
  addRates,
  removeSelectedCheckbox,
} from "../../store/slices/ratesSlice";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#3b3b3a 0%,#2e2d2d 50%,#0e0d0e 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#3b3b3a 0%,#2e2d2d 50%,#0e0d0e 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 95deg,#3b3b3a 0%,#2e2d2d 50%,#0e0d0e 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed &&
    {
      //backgroundImage:
      // "linear-gradient( 95deg,#3b3b3a 0%,#2e2d2d 50%,#0e0d0e 100%)",
      //opacity: "0",
    }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <DoubleArrowIcon />,
    2: <DoubleArrowIcon />,
    3: <DoubleArrowIcon />,
    4: <DoubleArrowIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {active && icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const CustomizedSteppers = ({ data, val }) => {
  const addedRates = useSelector((state) => state.ratesReducer.addedRates);
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(null);

  const onCheckIfItemWasAddedHandler = (id) => {
    return addedRates.some((rate) => rate.id === id);
  };

  const onCurrentStepHandler = (idx, item, itemId) => {
    setCurrentStep(idx);
    const exist = onCheckIfItemWasAddedHandler(itemId);
    if (exist) {
      setCurrentStep(null);
      dispatch(removeSelectedCheckbox(itemId));
    } else {
      setCurrentStep(idx);
      dispatch(addRates(item));
    }
  };

  return (
    <div className="Stepper">
      <Stack sx={{ width: "70%" }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={currentStep}
          connector={<ColorlibConnector />}
        >
          {data?.map((label, idx) => (
            <Step key={label.id}>
              <StepLabel
                onClick={() => onCurrentStepHandler(idx, label, label.id)}
                StepIconComponent={ColorlibStepIcon}
              >
                {label.value} {val}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </div>
  );
};

export default CustomizedSteppers;
