import React from "react";

const Subtitle = ({ title, children }) => {
  return (
    <>
      <h3 style={{ fontSize: "24px" }}> {title}</h3>
      {children}
    </>
  );
};

export default Subtitle;
