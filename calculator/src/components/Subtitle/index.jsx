import React from "react";

const Subtitle = ({ title, descr, subdescr }) => {
  return (
    <>
      <h3 style={{ fontSize: "24px" }}> {title}</h3>
      <p>{descr}</p>
      <p> {subdescr}</p>
    </>
  );
};

export default Subtitle;
