// import React from "react"
// import Navbar from '../../molecules/Navbar/Navbar'
// import Footer from "../../molecules/Footer/Footer";
// import Cards from '../../molecules/cards/Cards'
// import { IoDocumentAttachSharp } from "react-icons/io5";
// import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
// import { MdEditDocument } from "react-icons/md";

// const HomePlantilla = () => {
//   return (
//     <>
//       <div className="flex flex-col items-center justify-center w-screen h-screen bg-stone-400">
//         <div className="w-full">
//           <Navbar />
//         </div>
//         <div className="w-full max-w-screen-lg flex flex-col md:flex-row gap-16 justify-between mt-4">
//           <div className="w-full md:w-1/2 mb-4 md:mb-0">
//             <Cards
//               title={"Gestion documental"}
//               span={"Organiza y administra tus documentos"}
//               icon1={<IoDocumentAttachSharp className="ml-4 text-3xl" />}
//               span1={"Sube y almacena tus documentos"}
//               icon2={<HiDocumentMagnifyingGlass className="ml-4 text-3xl" />}
//               span2={"Busca y accede a tus archivos"}
//               icon3={<MdEditDocument className="ml-4 text-3xl" />}
//               span3={"Edita tus documentos"}
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <Cards
//               title={"Servicios"}
//               span={"Nuestra gama de productos y servicios."}
//             />
//           </div>
//         </div>
//       </div>
//         <div className=""><Footer /></div>
//     </>
//   );
// };

// export default HomePlantilla;


import React from "react";
import Navbar from "../../molecules/Navbar/Navbar";
import Footer from "../../molecules/Footer/Footer";
import Cards from "../../molecules/cards/Cards";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { MdEditDocument } from "react-icons/md";

const HomePlantilla = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="relative w-full max-w-screen-lg flex flex-col md:flex-row gap-16 justify-between mt-auto">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Cards
            title={"Gestion documental"}
            span={"Organiza y administra tus documentos"}
            icon1={<IoDocumentAttachSharp className="ml-4 text-3xl" />}
            span1={"Sube y almacena tus documentos"}
            icon2={<HiDocumentMagnifyingGlass className="ml-4 text-3xl" />}
            span2={"Busca y accede a tus archivos"}
            icon3={<MdEditDocument className="ml-4 text-3xl" />}
            span3={"Edita tus documentos"}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Cards
            title={"Servicios"}
            span={"Nuestra gama de productos y servicios."}
          />
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomePlantilla;
