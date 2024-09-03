import React, { useState } from 'react';
import { Switch } from '@nextui-org/react';

const CustomSwitch = ({ isSelected, onChange }) => {
  const [selected, setSelected] = useState(isSelected);
  
  const handleChange = () => {
    const newState = !selected;
    setSelected(newState);
    onChange(newState); // Llama a la función onChange con el nuevo estado
  };

  return (
    <Switch
      checked={selected}
      onChange={handleChange}
    />
  );
};

export default CustomSwitch;
