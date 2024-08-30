
// const Carousel = () => {
  

//   return (
//     <>
//       <div className="carousel rounded-box w-96">
//         <div className="carousel-item w-1/2">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
//             className="w-full"
//           />
//         </div>
//         <div className="carousel-item w-1/2">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
//             className="w-full"
//           />
//         </div>
//         <div className="carousel-item w-1/2">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
//             className="w-full"
//           />
//         </div>
//         <div className="carousel-item w-1/2">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
//             className="w-full"
//           />
//         </div>
//         <div className="carousel-item w-1/2">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
//             className="w-full"
//           />
//         </div>
//         <div className="carousel-item w-1/2">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
//             className="w-full"
//           />
//         </div>
//         <div className="carousel-item w-1/2">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
//             className="w-full"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Carousel;


import { useEffect, useRef } from "react";

const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      // Establecer el intervalo para desplazar las imágenes
      const interval = setInterval(() => {
        // Mueve el carrusel una imagen a la vez
        carousel.scrollBy({
          left: carousel.clientWidth,
          behavior: "smooth",
        });

        // Reinicia el carrusel al llegar al final
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, 3000); // Cambia la imagen cada 3 segundos

      // Limpieza del intervalo al desmontar el componente
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div
      ref={carouselRef}
      className="carousel rounded-box w-96 flex overflow-x-hidden"
    >
      <div className="carousel-item w-full flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
          className="w-full"
          alt="Slide 1"
        />
      </div>
      <div className="carousel-item w-full flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
          className="w-full"
          alt="Slide 2"
        />
      </div>
      <div className="carousel-item w-full flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
          className="w-full"
          alt="Slide 3"
        />
      </div>
      <div className="carousel-item w-full flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
          className="w-full"
          alt="Slide 4"
        />
      </div>
      <div className="carousel-item w-full flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
          className="w-full"
          alt="Slide 5"
        />
      </div>
      <div className="carousel-item w-full flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
          className="w-full"
          alt="Slide 6"
        />
      </div>
      <div className="carousel-item w-full flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
          className="w-full"
          alt="Slide 7"
        />
      </div>
    </div>
  );
};

export default Carousel;
