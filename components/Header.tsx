import { Flex, Heading, Box } from "@chakra-ui/react";

const Header = () => {
  return (
    <header>
      <Flex
        align="center"
        justify="center"
        p="4"
        bgGradient="linear(to-r, blue.400, blue.500)"
      >
        <Box>
          <Heading as="h1" size="md" color="white">
            POST
          </Heading>
        </Box>
      </Flex>
    </header>
  );
};

export default Header;
