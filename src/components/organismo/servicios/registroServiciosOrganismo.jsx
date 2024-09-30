import { useState, useContext } from "react";
import { toast } from "react-toastify";
import SelectAtomo from "../../atoms/Select";
import InputAtomo from "../../atoms/Input";
import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";
import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
import { useGetUsuarioQuery } from "../../../store/api/users";
import { useGetMuestrasQuery } from "../../../store/api/muestra";
import {
  useObtenerVariablesParaServicioMutation,
  useRegistrarServicioMutation,
} from "../../../store/api/servicio/serviciosSlice";
import { useForm, Controller } from "react-hook-form";
import Mybutton from "../../atoms/Mybutton";
import { AuthContext } from "../../../context/AuthContext";

const registroServiciosOrganismo = () => {

  //acceso al contexto de autenticacion
  const { authData } = useContext(AuthContext);

  // Trae los datos de los tipos de servicios
  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =
    useGetTipoServicioQuery();

  // Slice que permite la obtencion de las variables
  const [obtenerVariables] = useObtenerVariablesParaServicioMutation();
  //Slice que permite el registro de un servicio
  const [registrarServicio] = useRegistrarServicioMutation();

  // Trae los datos de ambientes, muestras, precios y usuarios
  const { data: dataAmbientes } = useGetAmbientesQuery();
  const { data: dataMuestras } = useGetMuestrasQuery();
  const { data: dataUsuarios } = useGetUsuarioQuery();

  //estados para el manejo de la informacion de los select
  const [tipoServicioActual, setTipoServicioActual] = useState("");
  const [variables, setVariables] = useState([]);
  // console.log("variables: ", variables);
  const [ambienteActual, setAmbienteActual] = useState("");
  const [muestraActual, setMuestraActual] = useState("");
  const [precioActual, setPrecioActual] = useState("");
  // const [datosUsuario, setDatosUsuario] = useState(null)

  const {
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Función que maneja el cambio de selección en el select
  const manejadorobtencionTipoServicio = async (e) => {
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

  const onSubmit = async (datosDelFormulario) => {
    console.log("Valores del formulario:", datosDelFormulario);

    const valoresVariables = {};

    variables.forEach((variable) => {
      const valor = datosDelFormulario[`variable_${variable.idVariable}`];
      if (valor !== undefined && valor !== "") {
        valoresVariables[variable.idVariable] = valor;
      }
    });

    console.log("Valores de variables:", valoresVariables);

    const payload = {
      fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
      fk_idAmbiente: datosDelFormulario.idAmbiente,
      fk_idMuestra: datosDelFormulario.id_muestra,
      fk_idUsuarios: authData.usuario.id,
      valoresVariables,
    };

    console.log("Datos del payload", payload);

    try {
      await registrarServicio(payload).unwrap();
      toast.success("Datos enviados con éxito!");
    } catch (error) {
      toast.error("Error al enviar los datos: " + error.message);
    }
  };

  return (
    <div className="w-auto h-auto max-h-screen flex flex-col gap-8 bg-gray-100 overflow-y-auto p-4">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 space-y-6 ">
            <SelectAtomo
              data={dataTipoServicio}
              label="Selecciona Tipo de Servicio"
              items="idTipoServicio"
              ValueItem="nombreServicio"
              value={tipoServicioActual}
              onChange={(e) => {
                const idTipoServicio = e.target.value;
                setTipoServicioActual(idTipoServicio);
                manejadorobtencionTipoServicio(e);
                setValue("fk_idTipoServicio", idTipoServicio);
              }}
            />

            <SelectAtomo
              data={dataAmbientes}
              label="Selecciona Ambiente"
              items="idAmbiente"
              ValueItem="nombre_ambiente"
              value={ambienteActual}
              onChange={(e) => {
                setValue("idAmbiente", e.target.value);
                setAmbienteActual(e.target.value);
              }}
            />

            <SelectAtomo
              data={dataMuestras}
              label="Selecciona Muestra"
              items="id_muestra"
              ValueItem="codigo_muestra"
              value={muestraActual}
              onChange={(e) => {
                setValue("id_muestra", e.target.value);
                setMuestraActual(e.target.value);
              }}
            />
          </div>

          {/* contenedor del select y el mapeo para mostrar variables */}
          <div>
            {variables.length > 0 && (
              <div className="mt-4">
                {variables.map((variable) => {
                  return (
                    <div
                      key={`variable_${variable.idVariable}`}
                      className="mb-10"
                    >
                      <InputAtomo
                        type={
                          variable.variable_tipo_dato === "number"
                            ? "number"
                            : "text"
                        }
                        placeholder={`Ingrese ${variable.variable_nombre}`}
                        id={`variable_${variable.idVariable}`}
                        name={`variable_${variable.idVariable}`}
                        register={register}
                        erros={errors}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Mybutton color={"primary"} type="submit">
              Enviar
            </Mybutton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default registroServiciosOrganismo;


