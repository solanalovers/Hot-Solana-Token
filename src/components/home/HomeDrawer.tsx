"use client";
import { getTokensData } from "@/supabase/getTokensData";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  Flex,
  Image,
  Text,
  Button,
  InputGroup,
  InputRightAddon,
  Input,
  Link,
  Box,
} from "@chakra-ui/react";
import React from "react";

interface HomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

function HomeDrawer({ isOpen, onClose, data }: HomeDrawerProps) {
  const bg = useColorModeValue("light.bg", "dark.bg");
  const border = useColorModeValue("light.border", "dark.border");
  const text = useColorModeValue(
    "var(--chakra-colors-blackAlpha-500)",
    "gray.200"
  );
  const text2 = useColorModeValue("light.text", "dark.text");
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent
          backgroundColor={bg}
          paddingX={"24px"}
          paddingY={"32px"}
        >
          <DrawerBody>
            <Flex
              columnGap={"12px"}
              marginBottom={"22px"}
            >
              <Image
                src={`${data?.imageUrl}` || "/image/token-image-2.png"}
                width={"86px"}
                height={"86px"}
                objectFit={"cover"}
                objectPosition={"center"}
              />
              <Flex
                flexDirection={"column"}
                rowGap={"4px"}
                overflow={"hidden"}
              >
                <Text
                  fontSize={"24px"}
                  lineHeight={"32px"}
                >
                  {data?.BaseTokenName}
                </Text>
                <Text
                  color={text2}
                  fontSize={"16px"}
                  lineHeight={"24px"}
                >
                  {data?.BaseTokenSymbol}
                </Text>
                <Link
                  noOfLines={1}
                  textOverflow={"ellipsis"}
                  textDecoration={"underline"}
                  href={`https://solscan.io/token/${data?.BaseTokenAddress}`}
                  isExternal
                  color={text2}
                  fontSize={"14px"}
                  lineHeight={"20px"}
                  _hover={{ opacity: 0.5 }}
                >
                  {data?.BaseTokenAddress}
                </Link>
                <Flex
                  marginTop={"8px"}
                  alignItems={"center"}
                  columnGap={"12px"}
                >
                  {data?.typesocials_Pair && (
                    <Link
                      href={data?.urlsocials_Pair}
                      isExternal
                    >
                      <Image
                        src={`/image/social/${data?.typesocials_Pair}.png`}
                        width={"32px"}
                        height={"32px"}
                      />
                    </Link>
                  )}
                  {data?.typesocials && (
                    <Link
                      href={data?.urlsocials}
                      isExternal
                    >
                      <Image
                        src={`/image/social/${data?.typesocials}.png`}
                        width={"32px"}
                        height={"32px"}
                      />
                    </Link>
                  )}
                  {data?.urlweb && (
                    <Link
                      href={data?.urlweb}
                      isExternal
                    >
                      <Image
                        src="/image/social/web.png"
                        width={"32px"}
                        height={"32px"}
                      />
                    </Link>
                  )}
                </Flex>
              </Flex>
            </Flex>
            <Flex
              borderTop={"1px solid"}
              borderTopColor={border}
              paddingTop={"16px"}
              flexDirection={"column"}
              rowGap={"16px"}
            >
              <Box>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Enter amount to send (per like)"
                    fontSize={"16px"}
                    _placeholder={{
                      color: "gray.400",
                    }}
                  />
                  <InputRightAddon>
                    <Flex columnGap={"10px"}>
                      <Image
                        src={`${data?.imageUrl}` || "/image/token-image-2.png"}
                        width="20px"
                        height={"20px"}
                      />
                      <Text
                        fontSize={"16px"}
                        lineHeight={"24px"}
                      >
                        {data?.BaseTokenSymbol}
                      </Text>
                    </Flex>
                  </InputRightAddon>
                </InputGroup>
                <Text
                  fontSize={"11px"}
                  lineHeight={"19px"}
                  color={text}
                >
                  with per like, you will need to pay ~0.00205 sol to solana
                  network
                </Text>
              </Box>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Enter amount to like (min: 10)"
                  _placeholder={{
                    color: "gray.400",
                  }}
                />
                <InputRightAddon>
                  <Image src="/image/thumbup.svg" />
                </InputRightAddon>
              </InputGroup>
              <Button
                backgroundColor={"blue.500"}
                color={"white"}
                _hover={{ backgroundColor: "blue.500", opacity: 0.8 }}
                onClick={async () => {
                  // getTokensData();
                }}
              >
                LIKE FOR {data?.BaseTokenName}
              </Button>
              <Text
                color={text}
                fontSize={"16px"}
                lineHeight={"24px"}
              >
                A node is a computer that connects to a cryptocurrency network.
                The node supports the cryptocurrency's network through either
                relaying transactions, validation, or hosting a copy of the
                blockchain. In terms of relaying transactions, each network
                computer (node) has a copy of the blockchain of the
                cryptocurrency it supports.
              </Text>
              <Text
                color={text}
                fontSize={"16px"}
                lineHeight={"24px"}
              >
                When a transaction is made, the node creating the transaction
                broadcasts details of the transaction using encryption to other
                nodes throughout the node network so that the transaction (and
                every other transaction) is known.
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default React.memo(HomeDrawer);
