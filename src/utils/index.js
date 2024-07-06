const setCookie = (name, value, duration) => {
    document.cookie =  `${name}=${value}; max-age=${duration} path=/;`;
}

const getCookie = (name) => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
}

const removeCookie = (name) => {
    document.cookie = `${name}=; max-age=0; path=/;`;
    
};


export { setCookie, getCookie, removeCookie };