
import React, { useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const Alert = ({ evento, estado, mensaje, titulo, tiempo }) => {
    /* el evento es el tipo de alerta que le quieran pasar que son  
    success,info,warn,error,secondary,contrast */
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({ severity: evento, summary: titulo, detail: mensaje, life: tiempo });
    }
    useEffect(() => {
        if (estado) {
            showSuccess();

        }
    }, [])

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
        </div>
    )



}
export default Alert

