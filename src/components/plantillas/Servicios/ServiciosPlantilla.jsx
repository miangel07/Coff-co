// import { useState } from "react";
// import { toast } from "react-toastify"; 
// import SelectAtomo from "../../atoms/Select";
// import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";
// import { useObtenerVariablesParaServicioMutation } from "../../../store/api/servicio/serviciosSlice";
// import { useForm } from "react-hook-form";
// import InputAtomo from "../../atoms/Input";

// const ComponenteSelectServicio = () => {
//   const [tipoServicioActual, setTipoServicioActual] = useState("");
//   const [variables, setVariables] = useState([]);

//   // Trae los datos de los tipos de servicios
//   const { data: dataTipoServicio, isLoading: isLoadingTipoServicio, refetch: refetchTipoServicio } = useGetTipoServicioQuery();
//   // Slice que permite la obtencion de las variables
//   const [obtenerVariables] = useObtenerVariablesParaServicioMutation();

//   const { setValue, register, handleSubmit, formState: { errors } } = useForm();

//   // Función que maneja el cambio de selección en el select
//   const manejadorCambioTipoServicio = async (e) => {
//     const idTipoServicio = e.target.value;
//     setTipoServicioActual(idTipoServicio);

//     try {
//       // Llama a la mutación para obtener las variables con base en el idTipoServicio
//       const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();

//       // Actualiza el estado con las variables recibidas
//       setVariables(respuesta);

//       // Opcional: Muestra una notificación de éxito
//       toast.success("Variables obtenidas con éxito!");
//     } catch (error) {
//       // Maneja cualquier error durante la obtención de las variables
//       toast.error("Error al obtener las variables: " + error.message);
//     }
//   };

//   return (
//     <div className="w-auto h-auto max-h-screen flex flex-col gap-8 bg-gray-100 overflow-y-auto p-4">
//       <div className="">
//         <form>
//           <div>
//             <InputAtomo
//             type='text'
//             id='nombre'
//             name='nombre'
//             placeholder='nombre'
//             register={register}
//             errors={errors}
//             />
//           <SelectAtomo
//             data={dataTipoServicio}
//             label="Selecciona Tipo de Servicio"
//             items="idTipoServicio"
//             ValueItem="nombreServicio"
//             value={tipoServicioActual}
//             onChange={(e) => {
//               manejadorCambioTipoServicio(e); // Llama a la función de cambio
//               setValue('fk_idTipoServicio', e.target.value); // Actualiza el valor en el form
//             }}
//           />
//           </div>
//         </form>
//       </div>

//       {/* Muestra las variables obtenidas */}
//       {variables.length > 0 && (
//         <div className='mt-4'>
//           {variables.map((variable, index) => (
//             <div key={index} className="mb-4">
//               {/* Utiliza el InputAtomo para cada variable */}
//               <InputAtomo
//                 type={variable.variable_tipo_dato === 'number' ? 'number' : 'text'}
//                 placeholder={`Ingrese ${variable.variable_nombre}`}
//                 id={`variable_${variable.idVariable}`}
//                 name={`variable_${variable.idVariable}`}
//                 register={register}  // Registra el input en react-hook-form
//                 erros={errors}       // Pasa los errores del formulario
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ComponenteSelectServicio;




import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SelectAtomo from "../../atoms/Select";
import InputAtomo from "../../atoms/Input";
import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";
import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
import { useGetPreciosQuery } from "../../../store/api/precios/preciosSlice";
import { useGetUsuarioQuery } from "../../../store/api/users";
import { useObtenerVariablesParaServicioMutation } from "../../../store/api/servicio/serviciosSlice";
import { useForm, Controller } from "react-hook-form";


const ComponenteSelectServicio = () => {
  const [tipoServicioActual, setTipoServicioActual] = useState("");
  const [variables, setVariables] = useState([]);

  // Trae los datos de los tipos de servicios
  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } = useGetTipoServicioQuery();
  // Trae los datos de ambientes, muestras, precios y usuarios
  const { data: dataAmbientes } = useGetAmbientesQuery()
  // const { data: dataMuestras } = 
  const { data: dataPrecios } = useGetPreciosQuery()
  const { data: dataUsuarios } = useGetUsuarioQuery()
  // Slice que permite la obtencion de las variables
  const [obtenerVariables] = useObtenerVariablesParaServicioMutation();

  const { setValue, register, handleSubmit, control, formState: { errors } } = useForm();

  // Función que maneja el cambio de selección en el select
  const manejadorCambioTipoServicio = async (e) => {
    const idTipoServicio = e.target.value;
    setTipoServicioActual(idTipoServicio);

    try {
      // Llama a la mutación para obtener las variables con base en el idTipoServicio
      const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();
      setVariables(respuesta);
      toast.success("Variables obtenidas con éxito!");
    } catch (error) {
      toast.error("Error al obtener las variables: " + error.message);
    }
  };

  // Función que maneja el envío del formulario
  const onSubmit = async (data) => {
    console.log("Datos del formulario:", data);
    // Aquí puedes enviar los datos a tu API o procesarlos como necesites
    try {
      // Realiza la operación deseada con los datos del formulario
      toast.success("Datos enviados con éxito!");
    } catch (error) {
      toast.error("Error al enviar los datos: " + error.message);
    }
  };

  return (
    <div className="w-auto h-auto max-h-screen flex flex-col gap-8 bg-gray-100 overflow-y-auto p-4">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>


          {/* Inputs para los campos de la tabla `servicios` */}
          <InputAtomo
            type="text"
            placeholder="Nombre del Servicio"
            id="nombre"
            name="nombre"
            register={register}
            erros={errors}
          />

          <InputAtomo
            type="date"
            placeholder="Fecha"
            id="fecha"
            name="fecha"
            register={register}
            erros={errors}
          />

          <Controller
            name="fk_idAmbiente"
            control={control}
            render={({ field }) => (
              <SelectAtomo
                data={dataAmbientes}
                label="Selecciona Ambiente"
                items="idAmbiente"
                ValueItem="nombre_ambiente"
                {...field}
              />
            )}
          />

          {/* <Controller
            name="fk_idMuestra"
            control={control}
            render={({ field }) => (
              <SelectAtomo
                data={dataMuestras}
                label="Selecciona Muestra"
                items="id_muestra"
                ValueItem="codigo_muestra"
                {...field}
              />
            )}
          /> */}

          <Controller
            name="fk_idPrecio"
            control={control}
            render={({ field }) => (
              <SelectAtomo
                data={dataPrecios}
                label="Selecciona Precio"
                items="idPrecio"
                ValueItem="precio"
                {...field}
              />
            )}
          />

          <Controller
            name="fk_idUsuarios"
            control={control}
            render={({ field }) => (
              <SelectAtomo
                data={dataUsuarios}
                label="Selecciona Usuario"
                items="id_usuario"
                ValueItem="nombre"
                {...field}
              />
            )}
          />

          <InputAtomo
            type="number"
            placeholder="Cantidad de Salida"
            id="cantidad_salida"
            name="cantidad_salida"
            register={register}
            erros={errors}
          />

          <InputAtomo
            type="date"
            placeholder="Fecha Fin"
            id="fecha_fin"
            name="fecha_fin"
            register={register}
            erros={errors}
          />

          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <SelectAtomo
                data={[
                  { id: 'en proceso', nombreServicio: 'En proceso' },
                  { id: 'terminado', nombreServicio: 'Terminado' }
                ]}
                label="Selecciona Estado"
                items="id"
                ValueItem="nombreServicio"
                {...field}
              />
            )}
          />

<SelectAtomo
            data={dataTipoServicio}
            label="Selecciona Tipo de Servicio"
            items="idTipoServicio"
            ValueItem="nombreServicio"
            value={tipoServicioActual}
            onChange={(e) => {
              manejadorCambioTipoServicio(e);
              setValue('fk_idTipoServicio', e.target.value);
            }}
          />


{variables.length > 0 && (
        <div className='mt-4'>
          {variables.map((variable, index) => (
            <div key={index} className="mb-4">
              {/* Utiliza el InputAtomo para cada variable */}
              <InputAtomo
                type={variable.variable_tipo_dato === 'number' ? 'number' : 'text'}
                placeholder={`Ingrese ${variable.variable_nombre}`}
                id={`variable_${variable.idVariable}`}
                name={`variable_${variable.idVariable}`}
                register={register}  // Registra el input en react-hook-form
                erros={errors}       // Pasa los errores del formulario
              />
            </div>
          ))}
        </div>
      )}

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComponenteSelectServicio;

