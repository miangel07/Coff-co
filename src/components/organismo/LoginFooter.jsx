import React from "react";
import LoginComponent from "../molecules/login/LoginComponents";
import Footer from "../molecules/Footer/Footer";

const LoginFooter = () => {
  return (
    <div className="w-screen  flex flex-col h-screen ">
      <div className="w-full h-4/5  justify-center items-center flex">
        <LoginComponent />
      </div>
      <div className="w-ful h-full justify-end flex-col flex ">

     <Footer /> 
      </div>
    </div>
  );
};

export default LoginFooter;
