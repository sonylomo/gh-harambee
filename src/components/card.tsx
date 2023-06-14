import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsArrowUpRight, BsBookmark, BsBookmarkFill } from "react-icons/bs";

// title
// created_at
// state
// merged_at
// url
// user.login
// body
export default function Contribution({
  title = "improv: ask for clipboard permission",
  created_at = "2023-05-29T15:13:03Z",
  state = "open",
  merge_at = null,
  url = "https://api.github.com/repos/Mirrorful/mirrorful/pulls/495",
  user_login = "sonylomo", //user.login
  description = "fixes issue #469 ",
}) {
  const [liked, setLiked] = useState(false);

  return (
    <Center py={6}>
      <Box
        w={"xl"}
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {state}
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {title}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {description}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <a href={url}>
              <Text fontSize={"md"} fontWeight={"semibold"}>
                View more
              </Text>
            </a>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsBookmarkFill fill="red" fontSize={"24px"} />
            ) : (
              <BsBookmark fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
