import React, { useState } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import { useEliminarServicioMutation, useGetServicioQuery } from "../../../store/api/servicio/serviciosSlice";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Td from "../../atoms/Td";
import { Spinner, Switch } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ToolTip from "../../molecules/toolTip/ToolTip";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { useForm } from "react-hook-form";



const ServiciosPlantilla = () => {

  const [paginaActual, setPaginaActual]= useState(1)
  const itemsPorPagina=4
  const [servicioActual, setServicioActual]= useState("")

  const {data,isLoading,refetch}= useGetServicioQuery()
  const [eliminarServicio]= useEliminarServicioMutation()

  const [visible,setVisible]= useState(false)
  const [servicioSeleccionado, setServicioSeleccionado]= useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
    setValue,
  }= useForm()


  if(isLoading){
    return(
      <Spinner className="flex justify-center items-center h-screen bg-gray-100"/>
    )
  }

  const abrirModal=(servicio)=>{
    setVisible(true)
  }

  const cerrarModal=()=>{
    setVisible(false)
    reset()
    setServicioActual("")
  }



  const manejadorEliminarServicio =(id, nombre)=>{
    confirmAlert({
      title:(
        <div>
          <span>
            <b>Confirmación de eliminación</b>
          </span>
        </div>
      ),
      message:(
        <div>
          ¿Estás seguro de que quieres eliminar el precio
          <span style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            {nombre}
          </span>
          ?
        </div>
      ),
      buttons:[
        {
          label:'si',
          onClick:async()=>{
            try {
              await eliminarServicio(id).unwrap()
              toast.success('Servicio eliminado con exito')
            } catch (error) {
              console.error("Error al eliminar el servicio", error);
              toast.error("Error al eliminar el servicio");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada"),
        },
      ],
      closeOnClickOutside:true,
    });
  };


  const indiceUltimoItem=paginaActual*itemsPorPagina
  const indicePrimerItem=indiceUltimoItem-itemsPorPagina
  const itemsActualesServicio = data ? data.slice(indicePrimerItem,indiceUltimoItem):[]
  const totalPages=Math.ceil((data?.length||0)/itemsPorPagina)


  return (
    <>
      <div className="w-auto h-full flex flex-col gap-8 bg-gray-100">
        <div className="pt-10 pl-20">
          <Mybutton color={'primary'} onClick={()=>abrirModal(null)}>
            <b>Nuevo servicio</b>
          </Mybutton>
        </div>
        <div className="w-full px-20 h-auto overflow-y-auto">
        <TableMolecula>
          <Thead>
            <Th>ID</Th>
            <Th>Nombre del servicio</Th>
            <Th>Tipo servicio</Th>
            <Th>Fecha</Th>
            <Th>Nombre ambiente</Th>
            <Th>Codigo muestra</Th>
            <Th>Precio</Th>
            <Th>Nombre responsable</Th>
            <Th>Rol</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Thead>
          <Tbody>
            {itemsActualesServicio.length>0?(
              itemsActualesServicio.map((servicio)=>(
                <tr className="hover:bg-slate-200" key={servicio.id_servicios}>
                  <Td>{servicio.id_servicios}</Td>
                  <Td>{servicio.nombre}</Td>
                  <Td>{servicio.tipo_servicio}</Td>
                  <Td>{servicio.fecha}</Td>
                  <Td>{servicio.nombre_ambiente}</Td>
                  <Td>{servicio.codigo_muestra}</Td>
                  <Td>{servicio.precio}</Td>
                  <Td>{servicio.nombre_completo_usuario}</Td>
                  <Td>{servicio.rol_usuario}</Td>
                  <Td>
                  <Switch
                        color={
                          servicio.estado === "activo"
                            ? "success"
                            : "default"
                        }
                        isSelected={servicio.estado === "activo"}
                        onValueChange={(checked) =>
                          manejadorCambioEstadoSwitch(
                            checked,
                            servicio.id_servicios)
                        }
                      >
                        {servicio.estado}
                      </Switch>
                  </Td>
                  <Td>
                  <div className="flex flex-row gap-6">
                        <ToolTip
                          content="Eliminar"
                          placement="left"
                          icon={() => (
                            <MdDelete
                              size={"35px"}
                              onClick={() =>
                                manejadorEliminarServicio(
                                  servicio.id_servicios,
                                  servicio.nombre
                                )
                              }
                              className="cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300"
                            />
                          )}
                        />
                        <ToolTip
                          content="Actualizar"
                          placement="right"
                          icon={() => (
                            <FaRegEdit
                              size={"35px"}
                              onClick={() => abrirModal(ambiente)}
                              className="cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300"
                            />
                          )}
                        />
                      </div>
                  </Td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan={10} className="text-center">
                  <h1 className="text-2xl">
                    <b>No hay datos</b>
                  </h1>
                </td>
              </tr>
            )}
          </Tbody>
        </TableMolecula>
        </div>
        <div className="flex justify-center mt-4">
          <PaginationMolecula
          total={totalPages}
          initialPage={paginaActual}
          onChange={(pagina)=>setPaginaActual(pagina)}
          />
        </div>
      </div>
      <div className="flex">
        <ModalOrganismo>
          visible={visible}
        </ModalOrganismo>
      </div>
    </>
  );
};

export default ServiciosPlantilla;
