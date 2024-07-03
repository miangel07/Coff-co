import React from "react";
import LoginComponent from "../molecules/login/LoginComponents";
import Footer from "../molecules/Footer/Footer";

const LoginFooter = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-between">
      <div className="w-full  justify-center  flex">
        <LoginComponent />
      </div>
      <div className="w-ful">
        <Footer />
      </div>
    </div>
  );
};

export default LoginFooter;
