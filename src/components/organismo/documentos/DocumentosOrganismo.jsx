import Mybutton from "../../atoms/Mybutton";
import Filtro from "../../molecules/documentos/Filtro";
import { BiDownload } from "react-icons/bi";
import SelectDocumentos from "../../atoms/SelectDocumentos";
import { useEffect, useState } from "react";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Tbody from "../../molecules/table/Tbody";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";
import { useCambioEstadoMutation, useGetDocumentosQuery } from "../../../store/api/documentos";
import { useGetTipoDocumentosQuery } from "../../../store/api/TipoDocumentos";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import DocumentosFrom from "../../molecules/Formulario/DocumentosFrom";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Search from "../../atoms/Search";
import { Switch } from "@nextui-org/react";
import ModalOrganismo from "../Modal/ModalOrganismo";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import { MdEditDocument } from "react-icons/md";
import DocumentoEdit from "../../molecules/Formulario/DocumentoEdit";
import { useTranslation } from 'react-i18next';

const DocumentosOrganismo = () => {
  const [dataInput, SetDataInput] = useState("");
  const [pages, setPages] = useState(1);
  const [form, setFrom] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showdocument, setShowdocument] = useState([])
  const [isChecked, setIsChecked] = useState(true);
  const { t } = useTranslation();
  const [valuedocs, setValuedocs] = useState(null)
  const [dataValue, setDataValue] = useState(null)
  const { data, isLoading, isError, error } = useGetDocumentosQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [CambioEstado, { isSuccess, isLoading: loandEstado, isError: isErrorEstado, error: errorEstado, data: dataEstado }] = useCambioEstadoMutation()
  const { data: tipoData, isLoading: Tipo, isError: tipoError, error: errorTipo } = useGetTipoDocumentosQuery();


  const handlePageChange = (page) => {
    setPages(page);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(`${dataEstado?.message}`);

    }

  }, [isSuccess])
  const cantidad = 6;
  const final = pages * cantidad;
  const inicial = final - cantidad;
  const filteredData = data && data.length > 0
    ? data.filter((item) => {
      const isCheck = isChecked ? "activo" : "inactivo"

      const estadoVersionMatch = item.estado_version === isCheck
      const tipoDocumentoMatch = dataInput === "" ||
        (item.tipo_documento && item.tipo_documento.toLowerCase() === dataInput.toLowerCase());
      const nombreDocumentoMatch = searchTerm === "" ||
        (item.nombre_documento && item.nombre_documento.toLowerCase().includes(searchTerm.toLowerCase()));
      return tipoDocumentoMatch && nombreDocumentoMatch && estadoVersionMatch
    })
    : [];
  ;

  const handleVerdocumento = (doc) => {
    const url = `${import.meta.env.VITE_BASE_URL_DOCUMENTO}/${doc}`;
    setShowdocument([{ uri: url }]);

  }
  const handledescargar = (doc) => {
    const url = `${import.meta.env.VITE_BASE_URL_DOCUMENTO}/${doc}`;


    const link = document.createElement('a');
    link.href = url;
    link.download = doc;


    link.click();

  }

  const handleClick = async (doc) => {
    try {
      const id = doc.id_documentos
      confirmAlert({
        title: 'Confirmación de Cambiar el estado a inactivo',
        message: `¿Estás seguro de que quieres Cambiar el Estado al Documento  ${id}?`,
        buttons: [
          {
            label: 'Sí',
            onClick: async () => {
              try {
                await CambioEstado(data)
              } catch (error) {
                toast.error('Error al Cambiar el estado');
              }
            }
          },
          {
            label: 'No',
            onClick: () => toast.info('Operacion cancelada')
          }
        ],
        closeOnClickOutside: true,
      });
      const nuevoEstado = doc.estado_version === "activo" ? "inactivo" : "activo";
      const data = { id: id, estado: nuevoEstado }
    } catch (error) {
      console.error(error)
    }
  };

  const hadleActualizar = (doc) => {
    setFrom(true)
    setValuedocs(doc)
  }

  const hadeleEditar = (doc) => {
    setShowModal(true)
    setDataValue(doc)
  }
  const numeroPagina = Math.ceil(data?.length / cantidad);
  const DataArrayPaginacion = filteredData.slice(inicial, final);

  const closeModal = () => {
    setValuedocs(null)
    setFrom(false)
  }

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
    <section className="w-full  flex flex-col gap-3 ">
      <div className="w-full mt-3 border-slate-100  border-b-4 bg-white  flex flex-wrap justify-around   items-center">

        <Mybutton color={"primary"} type={"submit"} onClick={() => setFrom(true)}>
          {t("nuevo")}
        </Mybutton>
        {
          form &&
          <ModalOrganismo
            closeModal={closeModal}
            title={`${valuedocs ? t('actualizar') : t("registrar")}`}
            visible={form}
          >
            <DocumentosFrom valor={valuedocs} closeModal={closeModal} />
          </ModalOrganismo>
        }
        {
          showModal &&
          <ModalOrganismo
            closeModal={() => setShowModal(false)}
            title={t(`actualizar`)}
            visible={true}
          >

            <DocumentoEdit closeModal={closeModal} valor={dataValue} />

          </ModalOrganismo>
        }
        <div className="w-72 ">
          <SelectDocumentos
            label={t("selecioneTipoDocumento")}
            data={tipoData}
            onChange={(e) => SetDataInput(e.target.value)}
            items={"nombreDocumento"}
            ValueItem={"nombreDocumento"}
          />

        </div>
        <div className="w-[550px]">
          <Search label={"Search"} placeholder={"Buscar..."} onchange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div>
          <Switch
            color={
              isChecked ? "success" : "default"
            }
            isSelected={isChecked}
            onValueChange={(checked) =>
              setIsChecked(checked)
            }
          >
            {t("estado")}

          </Switch>
        </div>
      </div>
      <div className=" w-full  h-auto overflow-y-auto">
        <TableMolecula>
          <Thead>
            <Th>Id</Th>
            <Th>{t('Codigo')}</Th>
            <Th>{t('nombre')}</Th>
            <Th>{t('Version')}</Th>
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
                    color={doc.estado_version === "activo" ? "primary" : "default"}
                    isSelected={doc.estado_version === "activo"}
                    onValueChange={() => handleClick(doc)}
                  >
                    {doc.estado_version}
                  </Switch>
                </Td>
                <Td>{doc.tipo_documento}</Td>
                <Td>
                  <div className=" flex flex-row gap-3 justify-between">
                    <FaRegEye onClick={() => handleVerdocumento(doc.nombre_documento_version
                    )} className="cursor-pointer" size={"35px"} />
                    <BiDownload className="cursor-pointer" size={"30px"} onClick={() => handledescargar(doc.nombre_documento_version)} />
                    <FaRegEdit className="cursor-pointer" size={"30px"} onClick={() => hadeleEditar(doc)} />
                    <MdEditDocument onClick={() => hadleActualizar(doc)} className="cursor-pointer" size={"30px"} />
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
