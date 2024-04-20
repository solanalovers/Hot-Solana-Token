"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Flex,
  Image,
  Box,
  Text,
  Button,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { tempHomeList } from "../../constant/home-constant";
import HomeDrawer from "./HomeDrawer";
import { useState } from "react";

export default function HomeTableList() {
  const [selectedToken, setSelectedToken] = useState(null);
  const border = useColorModeValue("light.border", "dark.border");
  const text = useColorModeValue("light.text", "dark.text");
  const tokenName = useColorModeValue(
    "var(--chakra-colors-blackAlpha-800)",
    "white"
  );
  const text2 = useColorModeValue(
    "var(--chakra-colors-blackAlpha-800)",
    "gray.200"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HomeDrawer
        isOpen={isOpen}
        onClose={() => {
          setSelectedToken(null);
          onClose();
        }}
        data={selectedToken}
      />
      <TableContainer>
        <Table variant="unstyle">
          <Thead
            borderColor={border}
            borderBottom={"1px solid"}
          >
            <Tr>
              <Th>IDs</Th>
              <Th>TOKENS</Th>
              <Th>ADDRESS</Th>
              <Th>LIKE</Th>
              <Th>REWARD</Th>
              <Th>TOTAL LIKE</Th>
              <Th>MORE INFO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tempHomeList.map((data: any, idx: number) => (
              <Tr key={idx}>
                <Td>{data.id}</Td>
                <Td>
                  <Flex
                    alignItems={"center"}
                    columnGap={"8px"}
                  >
                    <Image
                      src="/image/token-img.png"
                      width={"32px"}
                      height={"32px"}
                      objectFit={"cover"}
                      objectPosition={"center"}
                    />
                    <Box>
                      <Text
                        fontSize={"12px"}
                        lineHeight={"16px"}
                        color={tokenName}
                      >
                        {data.token.name}
                      </Text>
                      <Text
                        fontSize={"12px"}
                        lineHeight={"16px"}
                        color={"gray.600"}
                      >
                        {data.token.desc}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Link
                    color={text}
                    textDecoration={"underline"}
                    href={`https://solscan.io/address/${data.address}`}
                    isExternal
                  >
                    {data.address.slice(0, 4)}...{data.address.slice(-4)}
                  </Link>
                </Td>
                <Td>
                  <Button
                    backgroundColor={"blue.500"}
                    paddingX={"8px"}
                    paddingY={"4px"}
                    _hover={{ backgrondColor: "unset", opacity: 0.8 }}
                    onClick={() => {
                      setSelectedToken(data);
                      onOpen();
                    }}
                  >
                    <Text
                      color={"white"}
                      fontSize={"12px"}
                      lineHeight={"16px"}
                    >
                      LIKE
                    </Text>
                  </Button>
                </Td>
                <Td>
                  <Text
                    fontSize={"14px"}
                    lineHeight={"20px"}
                    color={text2}
                  >
                    {data?.reward.host} HOST PER LIKE
                  </Text>
                  <Text
                    fontSize={"14px"}
                    lineHeight={"20px"}
                    color={text2}
                  >
                    {data?.reward.token} {data.symbol} PER LIKE
                  </Text>
                </Td>
                <Td>
                  <Text
                    fontSize={"14px"}
                    lineHeight={"20px"}
                    color={text2}
                  >
                    {data.total}
                  </Text>
                </Td>
                <Td>
                  <Flex
                    alignItems={"center"}
                    columnGap={"8px"}
                  >
                    <Link
                      href={`https://coinmarketcap.com/en/currencies/${data.token.name}`}
                      isExternal
                    >
                      <Image
                        src="/image/cmc.png"
                        width={"28px"}
                        height={"28px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Link>
                    <Link
                      href={"https://raydium.io/"}
                      isExternal
                    >
                      <Image
                        src="/image/raydium.png"
                        width={"28px"}
                        height={"28px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Link>
                    <Link
                      href={"https://www.orca.so"}
                      isExternal
                    >
                      <Image
                        src="/image/orca.png"
                        width={"28px"}
                        height={"28px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Link>
                    <Link
                      href={"https://www.meteora.ag/"}
                      isExternal
                    >
                      <Image
                        src="/image/meteor.png"
                        width={"28px"}
                        height={"28px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Link>
                    <Link
                      href={`https://birdeye.so/token/${data.address}`}
                      isExternal
                    >
                      <Image
                        src="/image/birdeye.png"
                        width={"28px"}
                        height={"28px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Link>
                    <Link
                      href={`https://dexscreener.com/solana/${data.address}`}
                      isExternal
                    >
                      <Image
                        src="/image/dex-screener.png"
                        width={"28px"}
                        height={"28px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Link>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
