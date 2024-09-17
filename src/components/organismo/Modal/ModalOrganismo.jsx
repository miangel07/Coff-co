
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Logosímbolo from "../../atoms/Logosímbolo";
import { useTranslation } from 'react-i18next';


const ModalOrganismo = ({ visible, closeModal, title, logo, children }) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal size={"4xl"} isOpen={visible} onClose={closeModal} className=" max-h-full overflow-y-auto ">
        <ModalContent className=""  >
          {(onClose) => (
            <>
              <ModalHeader className="flex md:flex-row flex-col md:justify-between   flex-wrap   md:items-center gap-1">
            <Logosímbolo/>
                <div className=" md:pl-10   justify-center flex items-center">
                  {title}
                </div>
                <div className=" pr-10  justify-center flex items-center ">
                  {logo}
                </div>
              </ModalHeader>
              <ModalBody  >{children}</ModalBody>
              <ModalFooter >
                <Button color="danger" variant="light" onPress={onClose}>
                 {t("cerrar")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalOrganismo;


