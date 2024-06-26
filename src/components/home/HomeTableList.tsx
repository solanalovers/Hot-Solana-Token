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
  Spinner,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { tempHomeList } from "../../constant/home-constant";
import HomeDrawer from "./HomeDrawer";
import { useEffect, useState } from "react";
import { getTokensData } from "@/supabase/getTokensData";

export default function HomeTableList({ tokenList, loading }: any) {
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
            {loading ? (
              <Tr>
                <Td />
                <Td />
                <Td />
                <Td paddingTop={"32px"}>
                  <Spinner />
                </Td>
                <Td />
                <Td />
                <Td />
              </Tr>
            ) : (
              <>
                {tokenList && tokenList.length > 0 && (
                  <>
                    {tokenList.map((data: any, idx: number) => (
                      <Tr key={idx}>
                        <Td>{data?.PairId}</Td>
                        <Td>
                          <Flex
                            alignItems={"center"}
                            columnGap={"8px"}
                          >
                            {data?.imageUrl && (
                              <Image
                                src={`${data?.imageUrl}`}
                                width={"32px"}
                                height={"32px"}
                                objectFit={"cover"}
                                objectPosition={"center"}
                              />
                            )}
                            <Box>
                              <Text
                                fontSize={"12px"}
                                lineHeight={"16px"}
                                color={tokenName}
                              >
                                {data?.BaseTokenName}
                              </Text>
                              <Text
                                fontSize={"12px"}
                                lineHeight={"16px"}
                                color={"gray.600"}
                              >
                                {data?.BaseTokenSymbol}
                              </Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td>
                          <Link
                            color={text}
                            textDecoration={"underline"}
                            href={`https://solscan.io/address/${data?.BaseTokenAddress}`}
                            isExternal
                          >
                            {data.BaseTokenAddress.slice(0, 4)}...
                            {data.BaseTokenAddress.slice(-4)}
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
                          {/* <Text fontSize={'14px'} lineHeight={'20px'} color={text2}>
                        {data?.reward?.host} HOST PER LIKE
                      </Text> */}
                          <Text
                            fontSize={"14px"}
                            lineHeight={"20px"}
                            color={text2}
                          >
                            1 HOTST PER LIKE
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontSize={"14px"}
                            lineHeight={"20px"}
                            color={text2}
                          >
                            {data?.vote_result && data?.vote_result[0]?.counts
                              ? `${data?.vote_result[0].counts}`
                              : "0"}
                          </Text>
                        </Td>
                        <Td>
                          {/* <Flex
                            alignItems={"center"}
                            columnGap={"8px"}
                          >
                            <Link
                              href={`https://coinmarketcap.com/en/currencies/${data?.BaseTokenName}`}
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
                              href={`https://birdeye.so/token/${data?.BaseTokenAddress}`}
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
                              href={`https://dexscreener.com/solana/${data?.BaseTokenAddress}`}
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
                          </Flex> */}
                          <Flex
                            marginTop={"8px"}
                            alignItems={"center"}
                            columnGap={"12px"}
                          >
                            {data?.typesocials_Pair && (
                              <Link
                                href={data?.urlsocials_Pair}
                                _hover={{ opacity: 0.8 }}
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
                                _hover={{ opacity: 0.8 }}
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
                                _hover={{ opacity: 0.8 }}
                              >
                                <Image
                                  src="/image/social/web.png"
                                  width={"32px"}
                                  height={"32px"}
                                />
                              </Link>
                            )}
                            <Link
                              href={`https://dexscreener.com/solana/${data?.BaseTokenAddress}`}
                              isExternal
                              _hover={{ opacity: 0.8 }}
                            >
                              <Image
                                src="/image/dex-screener.png"
                                width={"28px"}
                                height={"28px"}
                                objectFit={"cover"}
                                objectPosition={"center"}
                              />
                            </Link>
                            <Link
                              href={`https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${data?.BaseTokenAddress}`}
                              isExternal
                              _hover={{ opacity: 0.8 }}
                            >
                              <Image
                                src="/image/raydium.png"
                                width={"28px"}
                                height={"28px"}
                                background={"#151142"}
                                objectFit={"cover"}
                                objectPosition={"center"}
                              />
                            </Link>
                            <Link
                              href={`https://jup.ag/swap/SOL-${data?.BaseTokenAddress}`}
                              isExternal
                              _hover={{ opacity: 0.8 }}
                            >
                              <Image
                                src="/image/jup.png"
                                width={"28px"}
                                height={"28px"}
                                background={"#0F1524"}
                                objectFit={"cover"}
                                objectPosition={"center"}
                              />
                            </Link>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </>
                )}
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
