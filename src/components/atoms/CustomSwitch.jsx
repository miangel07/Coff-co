import React, { useState } from 'react';
import { Switch } from "@nextui-org/react";

const CustomSwitch = ({ isSelected }) => {
  const [selected, setSelected] = useState(isSelected);
  
  const handleChange = () => {
    setSelected(prev => !prev);
  };

  return (
    <Switch
      checked={selected}
      onChange={handleChange}
    />
  );
};

export default CustomSwitch;
