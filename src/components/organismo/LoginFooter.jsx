import React from "react";
import LoginComponent from "../molecules/login/LoginComponents";
import Footer from "../molecules/Footer/Footer";
import Logosímbolo from "../atoms/Logosímbolo";

const LoginFooter = () => {
  return (
    <div className="min-w-full  flex flex-col min-h-screen justify-between">
      <div className=" pl-7 pt-2  md:justify-start  justify-center flex">
        <Logosímbolo />
      </div>
      <div className="w-full justify-center  items-center  flex">
        <LoginComponent />
      </div>
      <div className="justify-center flex ">
        <Footer />
      </div>
    </div>
  );
};

export default LoginFooter;
