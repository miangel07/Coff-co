import Mybutton from "../../atoms/Mybutton";
import Filtro from "../../molecules/documentos/Filtro";
import { BiDownload } from "react-icons/bi";
import SelectDocumentos from "../../atoms/SelectDocumentos";
import { useContext, useEffect, useState } from "react";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Tbody from "../../molecules/table/Tbody";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";
import {
  useCambioEstadoMutation,
  useGetDocumentosQuery,
} from "../../../store/api/documentos";
import { useGetTipoDocumentosQuery } from "../../../store/api/TipoDocumentos";
import { FaRegEdit } from "react-icons/fa";
import DocumentosFrom from "../../molecules/Formulario/DocumentosFrom";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Search from "../../atoms/Search";
import { Switch } from "@nextui-org/react";
import ModalOrganismo from "../Modal/ModalOrganismo";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { MdEditDocument } from "react-icons/md";
import DocumentoEdit from "../../molecules/Formulario/DocumentoEdit";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../context/AuthContext";
import { useValidarServcioDocumentoMutation } from "../../../store/api/TipoServicio";

const DocumentosOrganismo = () => {
  const [dataInput, SetDataInput] = useState("");
  const { authData } = useContext(AuthContext)
  const [pages, setPages] = useState(1);
  const [form, setFrom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inactivos, setInactivos] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const { t } = useTranslation();
  const [valuedocs, setValuedocs] = useState(null);
  const [dataValue, setDataValue] = useState(null);
  const { data, isLoading, isError, error } = useGetDocumentosQuery();
  const [validarServicioDocumento, { isError: isErrorValidarServicioDocumento, error: ErrorValidarServicioDocumento, data: dataResponseValidarServicioDocumento, isSuccess: succesTipoServicio }] = useValidarServcioDocumentoMutation()
  const [searchTerm, setSearchTerm] = useState("");

  const rol = authData.usuario.rol

  const [
    CambioEstado,
    {
      isSuccess,
      isLoading: loandEstado,
      isError: isErrorEstado,
      error: errorEstado,
      data: dataEstado,
    },
  ] = useCambioEstadoMutation();
  const {
    data: tipoData,
    isLoading: Tipo,
    isError: tipoError,
    error: errorTipo,
  } = useGetTipoDocumentosQuery();

  const handlePageChange = (page) => {
    setPages(page);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(`${dataEstado?.message}`);
    }
  }, [isSuccess]);
  const cantidad = 6;
  const final = pages * cantidad;
  const inicial = final - cantidad;
  const filteredData =
    data && data.length > 0
      ? data.filter((item) => {
        const isCheck = isChecked ? "activo" : "inactivo";

        const estadoVersionMatch = item.estado_version === isCheck;
        const tipoDocumentoMatch =
          dataInput === "" ||
          (item.tipo_documento &&
            item.tipo_documento.toLowerCase() === dataInput.toLowerCase());
        const nombreDocumentoMatch =
          searchTerm === "" ||
          (item.nombre_documento &&
            item.nombre_documento
              .toLowerCase()
              .includes(searchTerm.toLowerCase()));
        return (
          tipoDocumentoMatch && nombreDocumentoMatch && estadoVersionMatch
        );
      })
      : [];
  const numeroPagina = Math.ceil(filteredData.length / cantidad);


  const DataArrayPaginacion = filteredData.slice(inicial, final);

  const handledescargar = (doc) => {
    const url = `${import.meta.env.VITE_BASE_URL_DOCUMENTO}/${doc}`;

    const link = document.createElement("a");
    link.href = url;
    link.download = doc;

    link.click();
  };

  const handleClick = async (doc) => {
    try {
      const id = doc.id_documentos;
      console.log(doc)

      if (doc.estado_version === "inactivo" && doc.fk_idTipoServicio > 0) {
        const response = await validarServicioDocumento({ idTipoServicio: doc.fk_idTipoServicio }).unwrap();


        if (response.message != true) {
          toast.error(`${response.message}`);
          return;
        }
        confirmAlert({
          title: "Confirmación de Cambiar el estado activo",
          message: `¿Estás seguro de que quieres Cambiar el Estado al Documento ${id}?`,
          buttons: [
            {
              label: "Sí",
              onClick: async () => {
                try {
                  const nuevoEstado = "activo";
                  const data = { id, estado: nuevoEstado };

                  await CambioEstado(data);
                } catch (error) {
                  toast.error("Error al Cambiar el estado");
                }
              },
            },
            {
              label: "No",
              onClick: () => toast.info("Operación cancelada"),
            },
          ],
          closeOnClickOutside: true,
        });

      }


      if (doc.estado_version === "activo" || (doc.fk_idTipoServicio == null && doc.estado_version === "inactivo")) {
        confirmAlert({
          title: "Confirmación de Cambiar el estado a inactivo",
          message: `¿Estás seguro de que quieres Cambiar el Estado al Documento ${id}?`,
          buttons: [
            {
              label: "Sí",
              onClick: async () => {
                try {
                  const nuevoEstado = "inactivo";
                  const data = { id, estado: nuevoEstado };

                  await CambioEstado(data);
                } catch (error) {
                  toast.error("Error al Cambiar el estado");
                }
              },
            },
            {
              label: "No",
              onClick: () => toast.info("Operación cancelada"),
            },
          ],
          closeOnClickOutside: true,
        });
      }

    } catch (error) {
      console.error(error);
      toast.error("Error al procesar la solicitud");
    }
  };
  const hadleEstado = (checked) => {
    setIsChecked(checked);
    setInactivos(!inactivos);
  };

  const hadleActualizar = (doc) => {
    setFrom(true);
    setValuedocs(doc);
  };

  const hadeleEditar = (doc) => {
    setShowModal(true);
    setDataValue(doc);
  };


  const closeModal = () => {
    setValuedocs(null);
    setFrom(false);
  };
  const closeModalEdit = () => {
    setShowModal(false);
  };

  if (isLoading || Tipo || loandEstado) return <p>Loading...</p>;
  if (tipoError || isErrorEstado || isError) {
    return (
      <p>
        {errorTipo?.message || "Error al cargar los tipos de documentos"}
        ||{errorEstado?.message || "Error al cambiar el estado del documento"}
        ||{error?.message || "Error al cargar los documentos"}
      </p>
    );
  }

  return (
    <section className="w-full  flex flex-col gap-3">
      <div className="w-full mt-4  flex flex-wrap justify-between items-center p-4 rounded-lg shadow-md">
        <Mybutton
          color={"primary"}
          type={"submit"}
          onClick={() => setFrom(true)}
          className="mb-2"
        >
          {t("nuevo")}
        </Mybutton>

        {form && (
          <ModalOrganismo
            closeModal={closeModal}
            title={`${valuedocs ? t("actualizar") : t("registrar")}`}
            visible={form}
          >
            <DocumentosFrom valor={valuedocs} closeModal={closeModal} />
          </ModalOrganismo>
        )}

        {showModal && (
          <ModalOrganismo
            closeModal={() => setShowModal(false)}
            title={t(`actualizar`)}
            visible={true}
          >
            <DocumentoEdit closeModalEdit={closeModalEdit} valor={dataValue} />
          </ModalOrganismo>
        )}

        <div className="flex items-center mb-2 w-72">
          <SelectDocumentos
            label={t("selecioneTipoDocumento")}
            data={tipoData}
            onChange={(e) => SetDataInput(e.target.value)}
            items={"nombreDocumento"}
            ValueItem={"nombreDocumento"}
          />
        </div>

        <div className="flex items-center mb-2 w-full max-w-[550px]">
          <Search
            label={""}
            placeholder={"Buscar..."}
            onchange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-2">
          <Switch
            color={isChecked ? "success" : "default"}
            isSelected={isChecked}
            onValueChange={(checked) => hadleEstado(checked)}
          >
            {t("estado")}
          </Switch>
        </div>
      </div>

      <div className=" w-full  h-auto overflow-y-auto">
        <TableMolecula>
          <Thead>
            <Th>Id</Th>
            <Th>{t("Codigo")}</Th>
            <Th>{t("nombre")}</Th>
            <Th>{t("Version")}</Th>
            <Th>{t("FechaVersion")}</Th>
            <Th>{t("FechaEmision")}</Th>
            <Th>{t("Estado")}</Th>
            <Th>{t("tipoDocumentos")}</Th>
            <Th>{t("acciones")}</Th>
          </Thead>
          <Tbody>
            {DataArrayPaginacion?.map((doc) => (
              <tr className=" hover:bg-slate-100 " key={doc.id_documentos}>
                <Td>{doc.id_documentos}</Td>
                <Td>{doc.codigo_documentos}</Td>
                <Td>{doc.nombre_documento}</Td>
                <Td>{doc.version}</Td>
                <Td>{doc.fecha_version.split("T")[0]}</Td>
                <Td>{doc.fecha_emision.split("T")[0]}</Td>
                <Td>
                  <Switch
                    color={
                      doc.estado_version === "activo" ? "success" : "default"
                    }
                    isSelected={doc.estado_version === "activo"}
                    onValueChange={() => handleClick(doc)}
                  >
                    {doc.estado_version}
                  </Switch>
                </Td>
                <Td>{doc.tipo_documento}</Td>
                <Td>
                  <div className=" flex flex-row gap-3 justify-between">
                    <BiDownload
                      className="cursor-pointer"
                      size={"30px"}
                      onClick={() =>
                        handledescargar(doc.nombre_documento_version)
                      }
                    />
                    {(inactivos && rol === "administrador") && (
                      <>
                        <FaRegEdit
                          className="cursor-pointer"
                          size={"30px"}
                          onClick={() => hadeleEditar(doc)}
                        />
                        <MdEditDocument
                          onClick={() => hadleActualizar(doc)}
                          className="cursor-pointer"
                          size={"30px"}
                        />
                      </>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </Tbody>
        </TableMolecula>
      </div>

      <div>
        <PaginationMolecula
          initialPage={pages}
          total={numeroPagina}
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default DocumentosOrganismo;
