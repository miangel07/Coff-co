import React, { useState, useEffect } from "react";
import { parseJwt } from "../../../utils/ValidarLogin";
import styled from 'styled-components'
//ICONOS
import { MdEdit } from "react-icons/md";
import { PiIdentificationBadgeThin, PiBriefcaseThin, PiEnvelopeSimpleThin, PiPhoneThin, PiUserThin, PiUserGearThin, PiPasswordThin, PiTrendUpDuotone, PiUserBold } from "react-icons/pi";
import { useGetUsuarioIdQuery, useActualizarUsuarioMutation, useActualizarContraMutation } from "../../../store/api/users";
//MODAL
import { useForm } from "react-hook-form";
import SelectAtomoActualizar from "../../atoms/SelectActualizar";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import UserFrom from "../../molecules/Formulario/UserFrom";
import InputAtomoActualizar from "../../atoms/InputActualizar";
import InputAtomo from "../../atoms/Input";

const PerfilPlantilla = () => {

    const [usuario, setUsuario] = useState(null); 
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
    const [roles, setRoles] = useState([]); 
    const closeModalActualizar = () => {setOpenModalActualizar(false);reset()};
    const closeModalActualizarContra = () => {setOpenModalActualizarContra(false);reset()};
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const {handleSubmit, register, watch, setValue, formState: { errors },reset,} = useForm();

    useEffect(() => {
        // Función para obtener los roles desde el backend
        const fetchRoles = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/rol/listar'); 
            const data = await response.json();
            setRoles(data);
          } catch (error) {
            console.error('Error al obtener los roles:', error);
          }
        };
        fetchRoles();
    }, []);
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
        reset();
        setOpenModalActualizar(false);
        }
    };
    const onsubmitActualizarContra = (valores) => {
        if (usuarioSeleccionado) {
        console.log("valores enviados:", valores);
        actualizarContraseña({ data: valores, id: usuarioSeleccionado.id_usuario });
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
                                    <h1>Información</h1>
                                    <button onClick={() => handleClickActualizar(user)} className='btn-edit'>
                                        <MdEdit className='icon-edit' />
                                    </button>
                                </div>
                                <div className='cont-data'>
                                    <div className='datos-info'>
                                        <p className='user-info-name'>Nombres</p>
                                        <p>{user.nombre}</p>
                                    </div>
                                    <PiUserThin className='icon-arrow' />
                                </div>
                                <hr />
                                <div className='cont-data-estado'>
                                    <div className='datos-info'>
                                        <p className='user-info-name'>Apellidos</p>
                                        <p>{user.apellidos}</p>
                                    </div>
                                    <PiUserThin className='icon-arrow' />
                                </div>
                                <hr />
                                <div className='cont-data'>
                                    <div className='datos-info'>
                                        <p className='user-info-name'>Identificación</p>
                                        <p>{user.numero_documento}</p>
                                    </div>
                                    <PiIdentificationBadgeThin className='icon-arrow' />
                                </div>
                                <hr />
                                <div className='cont-data'>
                                    <div className='datos-info'>
                                        <p className='user-info-name'>Tipo Documento</p>
                                        <p>{user.tipo_documento}</p>
                                    </div>
                                    <PiIdentificationBadgeThin className='icon-arrow' />
                                </div>
                                <hr />
                                <div className='cont-data'>
                                    <div className='datos-info'>
                                        <p className='user-info-name'>Telefono</p>
                                        <p>{user.telefono}</p>
                                    </div>
                                    <PiPhoneThin className='icon-arrow' />
                                </div>
                                <hr />
                                <div className='cont-data'>
                                    <div className='datos-info'>
                                        <p className='user-info-name'>Correo</p>
                                        <p>{user.correo_electronico}</p>
                                    </div>
                                    <PiEnvelopeSimpleThin className='icon-arrow' />
                                </div>
                                <hr />
                                <div className='cont-data'>
                                    <div className='datos-info'>
                                        <p className='user-info-name'>Rol</p>
                                        <p>{user.rol}</p>
                                    </div>
                                    <PiBriefcaseThin className='icon-arrow' />
                                </div>
                                
                            </div>
                            <div className='content-mini'>
                                <div className='card-content-mini'>
                                    <div className='title-infoP'>
                                        <h1>Contraseña</h1>
                                    </div>
                                    <button onClick={() => { handleClickActualizarContra(user) }} className='cont-data-password'>
                                        <div>
                                            <p className='password-hide'>••••••••</p>
                                            <p className='descrip-pass'>Cambia tu contraseña</p>
                                        </div>
                                        <PiPasswordThin className='icon-arrow' />
                                    </button>
                                </div>
                                {/* <div className='card-content-mini'>
                                    <div className='title-infoP'>
                                        <h1>Imagen de perfil</h1>
                                    </div>
                                    <button onClick={() => { setCambiarImagenModal(true) }} className='cont-img-info'>
                                        <p className='descrip-img'>Cambiar Imagen</p>
                                        <img src={"nada"} alt="imagen" />
                                    </button>
                                </div> */}
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
                            placeholder={"Ingrese el nombre del usuario"}
                            type={"text"}
                            defaultValue={usuarioSeleccionado?.nombre || ""}
                        />
                        <InputAtomoActualizar
                            register={register}
                            name={"apellidos"}
                            errores={errors}
                            id={"apellidos"}
                            placeholder={"Ingrese el apellido del usuario"}
                            type={"text"}
                            defaultValue={usuarioSeleccionado?.apellidos || ""}
                        />
                        <InputAtomoActualizar
                            register={register}
                            name={"correo_electronico"}
                            errores={errors}
                            id={"correo_electronico"}
                            placeholder={"Ingrese el correo del usuario"}
                            type={"text"}
                            defaultValue={usuarioSeleccionado?.correo_electronico || ""}
                        />
                        <InputAtomoActualizar
                            register={register}
                            name={"telefono"}
                            errores={errors}
                            id={"telefono"}
                            placeholder={"Ingrese el teléfono del usuario"}
                            type={"text"}
                            defaultValue={usuarioSeleccionado?.telefono || ""}
                        />

                        {/* 
                        <InputAtomoActualizar
                            register={register}
                            name={"password"}
                            errores={errors}
                            id={"password"}
                            placeholder={"Ingrese la contraseña del usuario"}
                            type={"password"}
                            defaultValue={usuarioSeleccionado?.password || ""}
                        /> */
                        }

                        <SelectAtomoActualizar
                            data={roles.map(role => ({ value: role.idRol, label: role.rol }))}
                            label={"Rol"}
                            items={"value"}
                            onChange={(e) => setValue("fk_idRol", e.target.value)}
                            placeholder={usuarioSeleccionado?.rol}
                            value={usuarioSeleccionado?.fk_idRol || ""}
                        />

                        <SelectAtomoActualizar
                            data={documentoOptions}
                            label={"Tipo Documento"}
                            items={"value"}
                            placeholder={usuarioSeleccionado?.tipo_documento}
                            onChange={(e) => setValue("tipo_documento", e.target.value)}
                            value={usuarioSeleccionado?.tipo_documento || ""}
                        />

                        {/* <SelectAtomo
                            data={estadoOptions}
                            label={"Estado"}
                            onChange={(e) => setValue("estado", e.target.value)}
                            items={"value"}
                            ValueItem={"label"}
                            placeholder={usuarioSeleccionado?.estado}
                            value={usuarioSeleccionado?.estado || ""}
                        /> */}
                            
                        <InputAtomoActualizar
                            register={register}
                            name={"numero_documento"}
                            errores={errors}
                            id={"numero_documento"}
                            placeholder={"Ingrese el número de identificación del usuario"}
                            type={"number"}
                            defaultValue={usuarioSeleccionado?.numero_documento || ""}
                        />
                        </>
                    }
                    />
                }
                visible={true}
                title={"Actualizar Usuario"}
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
                            placeholder={"Ingresa la contaseña actual"}
                            type={"password"}
                        />

                        <InputAtomo
                            register={register}
                            name={"contraNueva"}
                            erros={errors}
                            id={"contraNueva"}
                            placeholder={"Ingresa la contaseña nueva"}
                            type={"password"}
                        />
                       
                        </>
                    }
                    />
                }
                visible={true}
                title={"Actualizar Contraseña"}
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
