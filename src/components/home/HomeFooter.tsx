"use client";
import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { TriangleUpIcon } from "@chakra-ui/icons";

export default function HomeFooter({ page, setPage, total }: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue("light.text", "dark.text");
  const border = useColorModeValue("black", "white");

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      marginY={"16px"}
    >
      <Flex
        alignItems={"center"}
        columnGap={"16px"}
      >
        {colorMode === "dark" ? (
          <Image
            src={"/image/sun-icon.png"}
            width={"22px"}
            height={"22px"}
            onClick={toggleColorMode}
            _hover={{ opacity: 0.8 }}
            cursor={"pointer"}
          />
        ) : (
          <Image
            src={"/image/dark-icon.png"}
            width={"24px"}
            height={"24px"}
            onClick={toggleColorMode}
            _hover={{ opacity: 0.8 }}
            cursor={"pointer"}
          />
        )}
        <Link
          color={text}
          fontSize={"14px"}
          lineHeight={"16px"}
          href="https://createsolanatoken.xyz/"
          isExternal
        >
          Create new token (FREE)
        </Link>
      </Flex>
      <Flex
        alignItems={"center"}
        columnGap={"12px"}
      >
        <Text
          fontSize={"14px"}
          lineHeight={"16px"}
        >
          Showing pairs {page === 1 ? 1 : 100 * (page - 1) + 1}-{100 * page} of{" "}
          {total}
        </Text>
        <Flex
          alignItems={"center"}
          columnGap={"8px"}
        >
          <Button
            backgroundColor={"transparent"}
            border={"1px solid"}
            borderColor={border}
            paddingY={"10px"}
            paddingX={"24px"}
            disabled={page === 1}
            onClick={() => page !== 1 && setPage(page - 1)}
          >
            <Flex
              alignItems={"center"}
              columnGap={"8px"}
            >
              <TriangleUpIcon style={{ rotate: "-90deg" }} />
              <Text
                fontSize={"12px"}
                lineHeight={"20px"}
              >
                Pairs {page !== 1 ? (page - 1) * 100 + 1 : 1}-{100 * page}
              </Text>
            </Flex>
          </Button>
          <Button
            backgroundColor={"transparent"}
            border={"1px solid"}
            borderColor={border}
            paddingY={"10px"}
            paddingX={"24px"}
            onClick={() => setPage(page + 1)}
          >
            <Flex
              alignItems={"center"}
              columnGap={"8px"}
            >
              <TriangleUpIcon style={{ rotate: "90deg" }} />
              <Text
                fontSize={"12px"}
                lineHeight={"20px"}
              >
                Pairs {100 * page + 1}-{100 * (page + 1)}
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
