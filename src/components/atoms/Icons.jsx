import React from "react";

const Icons = ({ img }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        width: "20px",
        height: "20px",
      }}
    ></div>
  );
};

export default Icons;
