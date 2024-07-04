import React from "react";
import LoginComponent from "../molecules/Auth/LoginComponents";
import Footer from "../molecules/Footer/Footer";

const LoginFooter = () => {
  return (
    <div className="w-screen  flex flex-col h-screen ">
      <div className="w-full h-4/5  justify-center items-center flex">
        <LoginComponent />
      </div>
      <div className="w-ful  justify-end flex-col flex">

        <Footer /> 
      </div>
    </div>
  );
};

export default LoginFooter;
