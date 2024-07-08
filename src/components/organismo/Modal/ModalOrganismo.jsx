import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";


const ModalOrganismo = ({ visible, closeModal, title, logo, children }) => {
  return (
    <>
      <Modal size={"5xl"} isOpen={visible} onClose={closeModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex md:flex-row flex-col md:justify-between   flex-wrap   md:items-center gap-1">
                <div className=" md:pl-10   justify-center flex items-center">
                  {title}
                </div>
                <div className=" pr-10  justify-center flex items-center ">
                  {logo}
                </div>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" >
                  Registrar
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
