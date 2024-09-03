// import React from "react";
// import { Card as NextUICard, CardFooter, Image, Button } from "@nextui-org/react";

// const Card = ({ imageSrc, altText, footerText, buttonText, onButtonClick }) => {
//   return (
//     <NextUICard
//       isFooterBlurred
//       radius="lg"
//       className="object-contain mx-auto"
//     >
//       <Image
//         alt={altText}
//         className="object-cover"
//         height={200}
//         src={imageSrc}
//         width={200}
//       />
//       <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
//         <p className="text-sm text-black/80">{footerText}</p>
//         <Button
//           className="text-tiny text-white bg-black/20"
//           variant="flat"
//           color="default"
//           radius="lg"
//           size="sm"
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
      className="object-contain mx-auto"
    >
      <Image
        alt={altText}
        className="object-cover"
        height={200}
        src={imageSrc}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-sm text-black/80">{footerText}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </NextUICard>
  );
};

export default Card;
