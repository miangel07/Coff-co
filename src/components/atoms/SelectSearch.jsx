import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'primereact/treeselect';

const SelectSearch = ({ label, value, onChange, data, idKey, labelKey, placeholder }) => {
  const [nodes, setNodes] = useState(null);

  useEffect(() => {
    if (data) {
      const treeNodes = data.map(item => ({
        key: item[idKey],
        label: item[labelKey],
        data: item
      }));
      setNodes(treeNodes);
    }
  }, [data, idKey, labelKey]);

  return (
    <div className="field">
      <label htmlFor={label}>{label}</label>
      <TreeSelect
        value={value}
        onChange={(e) => onChange(e.value)}
        options={nodes}
        filter
        className="w-full md:w-20rem"
        placeholder={placeholder || `Seleccionar ${label}`}
      />
    </div>
  );
};

export default SelectSearch;