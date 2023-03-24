import { createPost, deletePost } from "@/config/api";
import {
  Button,
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
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type ModalWrapperProps = {
  children: (onOpen: () => void) => React.ReactNode;
  isCreate: boolean;
  title?: string;
  body?: string;
  id?: number;
};

const ModalComp = ({
  children,
  isCreate,
  title,
  body,
  id,
}: ModalWrapperProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = useMutation(createPost, {
    onError: () => {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    },
    onSuccess: (data) => {
      onClose();
      toast({
        title: "Post Created",
        status: "success",
        description:
          "resource will not be really updated on the server but it will be faked as if.",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    },
  });

  const edit = useMutation(deletePost, {
    onError: () => {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    },
    onSuccess: (data) => {
      onClose();
      toast({
        title: "Post Created",
        status: "success",
        description:
          "resource will not be really updated on the server but it will be faked as if.",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    },
  });
  const onCreate = (data: any) => {
    mutate(data);
  };
  const onEdit = (data: any) => {
    edit.mutate({ ...data, id });
  };
  return (
    <>
      {children(onOpen)}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isCreate ? "Create New Posts" : "Edit Posts"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                defaultValue={title}
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <Text fontSize="sm" color={"red.600"}>
                  *Title is required
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Input
                placeholder="Body"
                defaultValue={body}
                {...register("body", { required: true })}
              />
              {errors.body?.type === "required" && (
                <Text fontSize="sm" color={"red.600"}>
                  *Body is required
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {isCreate ? (
              <Button
                onClick={handleSubmit(onCreate)}
                colorScheme="blue"
                mr={3}
              >
                Create
              </Button>
            ) : (
              <Button onClick={handleSubmit(onEdit)} colorScheme="blue" mr={3}>
                Edit
              </Button>
            )}

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
