import App from "../App";
import LoginPages from "../pages/login/LoginPages";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let token = getCookie('Token'); 

export function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

let tokenExistAndStillValid = (token && parseJwt(token).exp * 1000 > Date.now());

const ValidarLogin = () => {
    return(
        <>
        {tokenExistAndStillValid ? <App/> : <LoginPages/> }
        </>
    )
}

export default ValidarLogin;