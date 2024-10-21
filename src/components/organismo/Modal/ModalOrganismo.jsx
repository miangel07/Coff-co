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
    <Modal 
      size="4xl"
      isOpen={visible} 
      onClose={closeModal}
      scrollBehavior="inside"
      className="max-h-[90vh]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center w-full">
                <Logosímbolo />
                <h1 className="text-lg font-semibold">{title}</h1>
                <div>{logo}</div>
              </div>
            </ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {t("cerrar")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalOrganismo;