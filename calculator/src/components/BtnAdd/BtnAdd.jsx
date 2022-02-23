import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const BtnAdd = ({ onOpen, open }) => {
  return (
    <IconButton>
      <AddCircleOutlineOutlinedIcon
        size={30}
        onClick={onOpen}
        style={{ transform: open ? "rotate(45deg)" : "rotate(180deg)" }}
      />
    </IconButton>
  );
};

export default BtnAdd;
