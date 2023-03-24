import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import CardPost from "@/components/CardPost";
import { SimpleGrid, Container, Button, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/config/api";
import { postsType } from "@/types/postsType";
import { AddIcon } from "@chakra-ui/icons";
import ModalComp from "@/components/ModalComp";

const inter = Inter({ subsets: ["latin"] });

type queryType = {
  isLoading: boolean;
  isError: boolean;
};

type queryPostType = queryType & postsType;
export default function Home() {
  const { data, isLoading, isError }: any = useQuery(["getPosts"], getAllPosts);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Container mt={10} maxW="7xl">
          <Center mb={10}>
            <ModalComp isCreate={true}>
              {(onOpen) => (
                <Button
                  onClick={onOpen}
                  colorScheme="green"
                  leftIcon={<AddIcon />}
                >
                  Create New Posts
                </Button>
              )}
            </ModalComp>
          </Center>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {data?.data?.map((data: postsType) => (
              <CardPost
                key={data.id}
                title={data.title}
                body={data.body}
                id={data.id}
              />
            ))}
          </SimpleGrid>
        </Container>
      </main>
    </>
  );
}
