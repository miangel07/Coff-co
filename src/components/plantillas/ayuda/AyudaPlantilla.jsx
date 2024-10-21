import { useState, useCallback } from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { useTranslation } from "react-i18next";

const AyudaPlantilla = () => {
    const [selectedManual, setSelectedManual] = useState(null);

    const {t} = useTranslation();
  
    const dataManual = [
      {
        titulo: t("manual_usuario"),
        subTitulo: t("aqui_encontrar_manual_usuario"),
        url: "/manual/ManualUsuario.pdf",
      },
      {
        titulo: t("manual_tecnico"),
        subTitulo: t("aqui_encontrar_manual_tecnico"),
        url: "/manual/7.ManualTécnico.pdf",
      },
      
    ];
  
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;
  
    const handleDownload = useCallback((url) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = url.split("/").pop();
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
    }, []);
  
    const closeModal = useCallback(() => {
      setSelectedManual(null);
    }, []);
  
    return (
      <div className="px-4 md:px-6 lg:px-8 py-8 rounded-tl-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataManual.map((manual, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{manual.titulo}</h2>
              <p className="text-gray-600 mb-4">{manual.subTitulo}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedManual(manual)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {t("Ver_pdf")}
                </button>
                <button
                  onClick={() => handleDownload(manual.url)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {t("descargar_pdf")}
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {selectedManual && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg w-full max-w-4xl max-h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">{selectedManual.titulo}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow overflow-auto">
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <div className="h-full">
                    <Toolbar />
                    <div style={{ height: "calc(100vh - 200px)" }}>
                      <Viewer
                        fileUrl={selectedManual.url}
                        plugins={[
                          pageNavigationPluginInstance,
                          toolbarPluginInstance,
                        ]}
                        defaultScale={SpecialZoomLevel.PageFit}
                      />
                    </div>
                  </div>
                </Worker>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default AyudaPlantilla;
