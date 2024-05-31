import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

interface ModalDescriptionProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({ isOpen, onClose, description }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Description</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {description}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDescription;
