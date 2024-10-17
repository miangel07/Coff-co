import React, { useState, useEffect } from "react";
import { parseJwt } from "../../../utils/ProtectedRoute";
import styled from 'styled-components'
import { useTranslation } from 'react-i18next';
//ICONOS
import { MdEdit } from "react-icons/md";
import { PiIdentificationBadgeThin, PiBriefcaseThin, PiEnvelopeSimpleThin, PiPhoneThin, PiUserThin, PiUserGearThin, PiPasswordThin, PiTrendUpDuotone, PiUserBold } from "react-icons/pi";
//FUNCIONES
import { useGetUsuarioIdQuery, useActualizarUsuarioMutation, useActualizarContraMutation } from "../../../store/api/users";
import { useGetRolQuery } from "../../../store/api/roles";
//ALERTAS
import { toast } from "react-toastify";
//MODAL
import { useForm } from "react-hook-form";
import SelectAtomoActualizar from "../../atoms/SelectActualizar";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import UserFrom from "../../molecules/Formulario/UserFrom";
import InputAtomoActualizar from "../../atoms/InputActualizar";
import InputAtomo from "../../atoms/Input";

const PerfilPlantilla = () => {

    const [usuario, setUsuario] = useState(null); 
    const { t } = useTranslation();
    const [openModalActualizar, setOpenModalActualizar] = useState(false);
    const [openModalActualizarContra, setOpenModalActualizarContra] = useState(false);

    // Función para obtener el valor de una cookie por nombre
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // OBTENER ID DEL USUARIO A TRAVÉS DEL TOKEN DESDE LAS COOKIES
    useEffect(() => {
        let token = getCookie('Token');
        if (token) {
            let decodedToken = parseJwt(token);
            const usuario = decodedToken.Usuario;
            console.log(decodedToken)
            console.log(usuario)
            if (usuario) {
                const id_usuario = usuario.id_usuario;
                setUsuario(id_usuario);
            } else {
                console.error('No se encontró el id_usuario en el token');
            }
        } else {
            console.error('Token no encontrado en las cookies');
        }
    }, []); 

    //ESTO ES PARA EL MODAL DE ACTUALIZACION DEL PERFIL
    const { data } = useGetUsuarioIdQuery(usuario, {skip: !usuario, });
    const [actualizarContraseña]= useActualizarContraMutation();
    const [actualizarUsuario]= useActualizarUsuarioMutation();
    const {data: roles, isLoading: cargandoRoles}= useGetRolQuery();
    const closeModalActualizar = () => {setOpenModalActualizar(false);reset()};
    const closeModalActualizarContra = () => {setOpenModalActualizarContra(false);reset()};
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const {handleSubmit, register, watch, setValue, formState: { errors },reset,} = useForm();

    const handleClickActualizar = (user) => {
        console.log("Usuario seleccionado:", user); 
        setUsuarioSeleccionado(user);
        setOpenModalActualizar(true);
    };
    const handleClickActualizarContra = (user) => {
        console.log("Usuario seleccionado:", user); 
        setUsuarioSeleccionado(user);
        setOpenModalActualizarContra(true);
    };
    const onsubmitActualizar = (valores) => {
        if (usuarioSeleccionado) {
        console.log("valores enviados:", valores);
        actualizarUsuario({ data: valores, id: usuarioSeleccionado.id_usuario });
        //ALERTAS PARA ACTUALIZACION DE INFORMACION
        toast.success("Perfil actualizado con éxito");
        reset();
        setOpenModalActualizar(false);
        }
    };

    const onsubmitActualizarContra = async (valores) => {
        if (usuarioSeleccionado) {
            console.log("valores enviados:", valores);
            //ALERTAS DE ERROR Y DE ACTUALIZACION CORRECTA
            try {
                await actualizarContraseña({ data: valores, id: usuarioSeleccionado.id_usuario }).unwrap();
                toast.success("Contraseña actualizada con éxito");
            } catch (error) {
                const mensajedeError = error?.error || "Error al actualizar la contraseña";
                toast.error(mensajedeError);
            }
            reset();
            setOpenModalActualizarContra(false);
        }
    };

    //OPCIONES PARA EL SELECT
    const documentoOptions = [
        { value: "cc", label: "cc" },
        { value: "ti", label: "ti" },
        { value: "nit", label: "nit" },
        { value: "pasaporte", label: "pasaporte" },
    ];

    return (
        <>
            <Contenedor>
                <div className='cont-item'>
                    {data && data.map(user => (
                        <div key={user.id_usuario} className='cont-prin'>
                        <div className='card-content'>
                            <div className='content-info-up'>
                                <h1>{t("informacion")}</h1>
                                <button onClick={() => handleClickActualizar(user)} className='btn-edit'>
                                    <MdEdit className='icon-edit' />
                                </button>
                            </div>
                            <div className='cont-data'>
                                <div className='datos-info'>
                                    <p className='user-info-name'>{t("nombres")}</p>
                                    <p>{user.nombre}</p>
                                </div>
                                <PiUserThin className='icon-arrow' />
                            </div>
                            <hr />
                            <div className='cont-data-estado'>
                                <div className='datos-info'>
                                    <p className='user-info-name'>{t("apellidos")}</p>
                                    <p>{user.apellidos}</p>
                                </div>
                                <PiUserThin className='icon-arrow' />
                            </div>
                            <hr />
                            <div className='cont-data'>
                                <div className='datos-info'>
                                    <p className='user-info-name'>{t("identificacion")}</p>
                                    <p>{user.numero_documento}</p>
                                </div>
                                <PiIdentificationBadgeThin className='icon-arrow' />
                            </div>
                            <hr />
                            <div className='cont-data'>
                                <div className='datos-info'>
                                    <p className='user-info-name'>{t("tipoDocumento")}</p>
                                    <p>{user.tipo_documento}</p>
                                </div>
                                <PiIdentificationBadgeThin className='icon-arrow' />
                            </div>
                            <hr />
                            <div className='cont-data'>
                                <div className='datos-info'>
                                    <p className='user-info-name'>{t("telefono")}</p>
                                    <p>{user.telefono}</p>
                                </div>
                                <PiPhoneThin className='icon-arrow' />
                            </div>
                            <hr />
                            <div className='cont-data'>
                                <div className='datos-info'>
                                    <p className='user-info-name'>{t("correo")}</p>
                                    <p>{user.correo_electronico}</p>
                                </div>
                                <PiEnvelopeSimpleThin className='icon-arrow' />
                            </div>
                            <hr />
                            <div className='cont-data'>
                                <div className='datos-info'>
                                    <p className='user-info-name'>{t("rol")}</p>
                                    <p>{user.rol}</p>
                                </div>
                                <PiBriefcaseThin className='icon-arrow' />
                            </div>
                        </div>
                        <div className='content-mini'>
                            <div className='card-content-mini'>
                                <div className='title-infoP'>
                                    <h1>{t("contrasena")}</h1>
                                </div>
                                <button onClick={() => { handleClickActualizarContra(user) }} className='cont-data-password'>
                                    <div>
                                        <p className='password-hide'>••••••••</p>
                                        <p className='descrip-pass'>{t("cambiaContrasena")}</p>
                                    </div>
                                    <PiPasswordThin className='icon-arrow' />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    ))}
                </div>

                {/* MODAL ACTUALIZAR*/}
                {openModalActualizar && (
                <ModalOrganismo
                    // logo={<Logosímbolo />}
                    children={
                        <UserFrom
                            onsubmit={handleSubmit(onsubmitActualizar)}
                            children={
                                <>
                                    <InputAtomoActualizar
                                        register={register}
                                        name={"nombre"}
                                        errores={errors}
                                        id={"nombre"}
                                        placeholder={t("ingreseNombreUsuario")}
                                        type={"text"}
                                        defaultValue={usuarioSeleccionado?.nombre || ""}
                                    />
                                    <InputAtomoActualizar
                                        register={register}
                                        name={"apellidos"}
                                        errores={errors}
                                        id={"apellidos"}
                                        placeholder={t("ingreseApellidoUsuario")}
                                        type={"text"}
                                        defaultValue={usuarioSeleccionado?.apellidos || ""}
                                    />
                                    <InputAtomoActualizar
                                        register={register}
                                        name={"correo_electronico"}
                                        errores={errors}
                                        id={"correo_electronico"}
                                        placeholder={t("ingreseCorreoUsuario")}
                                        type={"text"}
                                        defaultValue={usuarioSeleccionado?.correo_electronico || ""}
                                    />
                                    <InputAtomoActualizar
                                        register={register}
                                        name={"telefono"}
                                        errores={errors}
                                        id={"telefono"}
                                        placeholder={t("ingreseTelefonoUsuario")}
                                        type={"text"}
                                        defaultValue={usuarioSeleccionado?.telefono || ""}
                                    />
                                    <SelectAtomoActualizar
                                        data={roles.map(role => ({ value: role.idRol, label: role.rol }))}
                                        label={t("rol")}
                                        items={"value"}
                                        onChange={(e) => setValue("fk_idRol", e.target.value)}
                                        placeholder={usuarioSeleccionado?.rol}
                                        value={usuarioSeleccionado?.fk_idRol || ""}
                                        habilitado={true}
                                    />
                                    <SelectAtomoActualizar
                                        data={documentoOptions}
                                        label={t("tipoDocumento")}
                                        items={"value"}
                                        placeholder={usuarioSeleccionado?.tipo_documento}
                                        onChange={(e) => setValue("tipo_documento", e.target.value)}
                                        value={usuarioSeleccionado?.tipo_documento || ""}
                                    />
                                    <InputAtomoActualizar
                                        register={register}
                                        name={"numero_documento"}
                                        errores={errors}
                                        id={"numero_documento"}
                                        placeholder={t("ingreseNumeroIdentificacion")}
                                        type={"number"}
                                        defaultValue={usuarioSeleccionado?.numero_documento || ""}
                                    />
                                </>
                            }
                        />
                    }
                    visible={true}
                    title={t("actualizarUsuario")}
                    closeModal={closeModalActualizar}
                />
                )}
                {/* FIN MODAL ACTUALIZAR*/}

                {/* MODAL ACTUALIZAR CONTRA*/}
                {openModalActualizarContra && (
                    <ModalOrganismo
                        // logo={<Logosímbolo />}
                        children={
                            <UserFrom
                                onsubmit={handleSubmit(onsubmitActualizarContra)}
                                children={
                                    <>
                                        <InputAtomo
                                            register={register}
                                            name={"contraActual"}
                                            erros={errors}
                                            id={"contraActual"}
                                            placeholder={t("ingresaContraseñaActual")}
                                            type={"password"}
                                        />
                                        <InputAtomo
                                            register={register}
                                            name={"contraNueva"}
                                            erros={errors}
                                            id={"contraNueva"}
                                            placeholder={t("ingresaContraseñaNueva")}
                                            type={"password"}
                                        />
                                    </>
                                }
                            />
                        }
                        visible={true}
                        title={t("actualizarContraseña")}
                        closeModal={closeModalActualizarContra}
                    />
                )}

                {/* FIN MODAL ACTUALIZAR CONTRA*/}
            </Contenedor>
        </>
    );
};

const Contenedor = styled.div`
    .cont-item{
        background: linear-gradient(to bottom, #c8c8c846, #e9e9e9a9, #ffffffad);
        border-radius: 15px 15px 0 0;
        padding-top: 15px;
    }
    .cont-prin{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 85vh;
        overflow-y: scroll;
    }
    .card-content{
        width: 60vw;
        height: auto;
        border: 1px #b4b4b488 solid;
        border-radius: 10px;
        background-color: white;
    }
    .content-info-up{
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }
    h1{
        font-size: 1.3em;
    }
    .btn-edit{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border-radius: 40px;
        font-size: 1.3em;
        transition: all 300ms;
    }
    .btn-edit:hover{
        background-color: #c7c7c769;
    }
    .cont-data, .cont-data-estado{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }
    .cont-data:hover{
        background-color: #d0d0d040;
    }
    .cont-data-estado:hover{
        border-radius: 0 0 10px 10px;
        background-color: #d0d0d040;
    }
    .datos-info{
        display: flex;
        align-items: center;
    }
    .user-info-name{
        width: 200px;
        font-size: 0.8em;
    }
    .icon-arrow{
        font-size: 1.4em;
    }
    .content-mini{
        display: flex;
        gap: 2vw;
        margin-top: 15px;
    }
    .card-content-mini{
        width: 29vw;
        height: auto;
        border: 1px #b4b4b488 solid;
        border-radius: 10px;
        background-color: white;
    }
    .title-infoP{
        padding: 20px;
    }
    .cont-data-password{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        .password-hide{
            display: flex;
        }
        .descrip-pass{
            font-size: 0.8em;
        }
    }
    .cont-data-password:hover{
        background-color: #d0d0d040;
    }
    .cont-img-info{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 10px 10px;
        img{
            height: 70px;
            width: 70px;
            border-radius: 50px;
        }
    }
    .cont-img-info:hover{
        background-color: #d0d0d040;
        border-radius: 0 0 10px 10px;
    }
    .descrip-img{
        font-size: 0.8em;
    }
    .card-content-firma{
        width: 60vw;
        height: auto;
        border: 1px #b4b4b488 solid;
        border-radius: 10px;
        background-color: white;
    }
    .cont-img-info-firma{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 10px 10px;
        img{
            height: 70px;
        }
    }
    .cont-img-info-firma:hover{
        background-color: #d0d0d040;
    }
`

export default PerfilPlantilla;
