import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { GrClose, GrMenu } from "react-icons/gr";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Layout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSession();
  console.log("session data: ", data);

  const filter =(url)=>{
    let regex = /https:\/\/avatars\.githubusercontent\.com\/u\/49971500\?v=4/i
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          position={"fixed"}
          w={"100%"}
          px={16}
          bgColor={"white"}
          shadow={"base"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <GrClose /> : <GrMenu />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="Logo of GH-Harambee"
            />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                {/* "https://avatars.githubusercontent.com/u/49971500?v=4" */}
                <Avatar size={"sm"} src={data.user.image} />
              </MenuButton>
              <MenuList>
                <MenuItem>{data.user.name}</MenuItem>
                <MenuItem>{data.user.email}</MenuItem>
                <MenuDivider />
                <MenuItem>
                  {" "}
                  <button onClick={() => signOut()}>Log out</button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>{children}</Box>
    </>
  );
}
