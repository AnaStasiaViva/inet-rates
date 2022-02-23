import React from "react";

const Subtitle = ({ title, descr, subdescr }) => {
  return (
    <>
      <h3> {title}</h3>
      <p>{descr}</p> changes..
      <p> {subdescr}</p>
    </>
  );
};

export default Subtitle;
