import Header from "@/components/Header";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

const DetailPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError }: any = useQuery(
    ["getPosts", id],
    async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      return data;
    }
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <Header />
      <Center>
        <Card maxW="sm">
          <CardBody>
            <Image
              src="https://picsum.photos/700/300"
              alt="Green double couch with wooden legs"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{data?.title}</Heading>
              <Text>{data?.body}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              <Link href="/">Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </>
  );
};

export default DetailPost;
