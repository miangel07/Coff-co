
const NodeService = {
    getData: async (endpoint) => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json(); // Asegúrate de que tu API devuelve JSON
      } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Retorna un array vacío en caso de error
      }
    },
  };
  
  export default NodeService;
  