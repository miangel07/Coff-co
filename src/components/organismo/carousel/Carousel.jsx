import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const items = [
    {
      src: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
      alt: "Image 1",
    },
    {
      src: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
      alt: "Image 2",
    },
    {
      src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      alt: "Image 3",
    },
    {
      src: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
      alt: "Image 4",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prevItem) =>
        prevItem === items.length - 1 ? 0 : prevItem + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [items.length]);

  return (
    <>
      <div className="carousel w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item w-full ${
              index === currentItem ? "block" : "hidden"
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
            className={`btn btn-xs ${
              index === currentItem ? "btn-active" : ""
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
