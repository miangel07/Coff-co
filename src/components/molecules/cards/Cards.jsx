// import React from "react";
// import { Card as NextUICard, CardFooter, Image, Button } from "@nextui-org/react";

// const Card = ({ imageSrc, altText, footerText, buttonText, onButtonClick }) => {
//   return (
//     <NextUICard
//       isFooterBlurred
//       radius="lg"
//       className="w-auto mx-auto" 
//     >
//       <Image
//         alt={altText}
//         className="object-cover w-full h-auto"
//         src={imageSrc}
//       />
//       <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
//         <p className="text-lg text-black/80">{footerText}</p>
//         <Button
//           className="text-tiny text-white bg-black/20"
//           variant="flat"
//           color="default"
//           radius="lg"
//           size="md"
//           onClick={onButtonClick}
//         >
//           {buttonText}
//         </Button>
//       </CardFooter>
//     </NextUICard>
//   );
// };

// export default Card;




import React from "react";
import { Card as NextUICard, CardFooter, Image, Button } from "@nextui-org/react";

const Card = ({ imageSrc, altText, footerText, buttonText, onButtonClick }) => {
  return (
    <NextUICard
      isFooterBlurred
      radius="lg"
      className="w-auto mx-auto"
    >
      <Image
        alt={altText}
        className="object-cover w-full h-auto"
        src={imageSrc}
      />
      <CardFooter 
        className="flex flex-col sm:flex-row justify-between items-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
      >
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/70">
          {footerText}
        </p>
        <Button
          className="text-xs sm:text-sm md:text-base lg:text-lg text-white bg-sena"
          variant="flat"
          color="white"
          radius="lg"
          size="md"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </NextUICard>
  );
};

export default Card;