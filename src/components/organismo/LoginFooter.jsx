import React from "react";
import LoginComponent from "../molecules/login/LoginComponents";
import Footer from "../molecules/Footer/Footer";
import Logosímbolo from "../atoms/Logosímbolo";

const LoginFooter = () => {
  return (
    <div className="w-full  flex flex-col h-screen ">
      <div className=" pl-7 mt-3  md:justify-start justify-center flex">
        <Logosímbolo />
      </div>
      <div className="w-full justify-center items-center  flex">
        <LoginComponent />
      </div>
      <div className=" h-full justify-end flex-col flex ">
        <Footer />
      </div>
    </div>
  );
};

export default LoginFooter;
