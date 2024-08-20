import React from "react";

const Icons = ({ img }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        width: "35px",
        height: "35px",
      }}
    ></div>
  );
};

export default Icons;
