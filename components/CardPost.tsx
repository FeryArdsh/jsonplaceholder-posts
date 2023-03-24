import { useState, useRef } from "react";
import {
  CardHeader,
  CardBody,
  Text,
  Card,
  CardFooter,
  Button,
  Heading,
  Flex,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const CardPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="sm"> Customer dashboard</Heading>
        </CardHeader>
        <CardBody py={0}>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter py={3}>
          <Flex alignItems="center" mb={2}>
            <Button
              mr={1}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              size="sm"
            >
              Read More
            </Button>
            <IconButton
              icon={<EditIcon />}
              aria-label="Edit"
              variant="ghost"
              color="green.600"
              onClick={onOpen}
            />
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete"
              variant="ghost"
              color="red.600"
            />
          </Flex>
        </CardFooter>
      </Card>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardPost;
