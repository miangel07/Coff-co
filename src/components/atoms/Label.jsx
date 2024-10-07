import React from "react";

const Label = ({children}) => {
  return (
    <label className="label">
      <span
        className="label-text font-calibri text-lg font-normal cursor-pointer"
        style={{ color: "#586E26" }}
      >
       {children}
      </span>
    </label>
  );
};

export default Label;
