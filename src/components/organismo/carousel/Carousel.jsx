import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const items = [
    {
      src: "/imagenes/carrousel1.png",
      alt: "Image 1",
    },
    {
      src: "/imagenes/carrousel2.png",
      alt: "Image 2",
    },
    {
      src: "/imagenes/carrousel3.png",
      alt: "Image 3",
    },
    {
      src: "/imagenes/carrousel4.png",
      alt: "Image 4",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prevItem) =>
        prevItem === items.length - 1 ? 0 : prevItem + 1
      );
    }, 6000); 

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [items.length]);

  return (
    <>
      <div className="carousel w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item w-full ${index === currentItem ? "block" : "hidden"
              }`}
          >
            <img src={item.src} alt={item.alt} className="w-full" />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {items.map((_, index) => (
          <a
            key={index}
            href={`#item${index + 1}`}
            className={`btn btn-xs ${index === currentItem ? "btn-active" : ""
              }`}
            onClick={() => setCurrentItem(index)}
          >
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
};

export default Carousel;
