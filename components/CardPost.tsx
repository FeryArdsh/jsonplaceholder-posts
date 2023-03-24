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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { postsType } from "@/types/postsType";
import Link from "next/link";
import ModalComp from "./ModalComp";
import { deletePost } from "@/config/api";

const CardPost = ({ title, body, id, userId }: postsType) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast({
        title: "Post deleted",
        status: "success",
        description:
          "resource will not be really updated on the server but it will be faked as if.",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    },
    onError: () => {
      queryClient.invalidateQueries(["posts"]);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    },
  });
  const onDelete = (id: any) => {
    mutate(id);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="sm">{title}</Heading>
        </CardHeader>
        <CardBody py={0}>
          <Text noOfLines={2}>{body}</Text>
        </CardBody>
        <CardFooter py={3}>
          <Flex alignItems="center" mb={2}>
            <Button
              mr={1}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              size="sm"
            >
              <Link href={`/detail/${id}`}>Read More</Link>
            </Button>
            <ModalComp isCreate={false} title={title} body={body} id={id}>
              {(onOpen) => (
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Edit"
                  variant="ghost"
                  color="green.600"
                  onClick={onOpen}
                />
              )}
            </ModalComp>
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete"
              variant="ghost"
              color="red.600"
              onClick={() => onDelete(id)}
            />
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardPost;
