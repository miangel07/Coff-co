const SelectMuestra = ({ id, name, register, label, options, erros }) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <select {...register(name)} id={id} className="border rounded p-2">
          <option value="">Seleccione una opción</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {erros[name] && <span className="text-red-500">{erros[name].message}</span>}
      </div>
    );
  };
  
  export default SelectMuestra;
  