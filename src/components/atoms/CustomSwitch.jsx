import React, { useState, useEffect } from 'react';
import { Switch } from '@nextui-org/react';

const CustomSwitch = ({ setisSelected, onChange }) => {

  // const [isSelected, setIsSelected] = React.useState();

  return (
    <Switch
      isSelected={setisSelected}
      onValueChange={onChange}
    />
  );
};

export default CustomSwitch;
