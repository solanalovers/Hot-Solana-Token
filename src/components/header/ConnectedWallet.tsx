"use client";
import { AppContext } from "@/provider/AppAdapter";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ConnectedWallet({ address }: { address: string }) {
  const walletName = localStorage.getItem("walletName")?.split('"')[1];
  const { balance } = useContext(AppContext);
  const { disconnect } = useWallet();

  return (
    <Flex
      paddingX={"12px"}
      paddingY={"4px"}
      columnGap={"16px"}
      alignItems={"center"}
      borderRadius={"8px"}
      border={"1px solid #11111126"}
    >
      <Flex
        columnGap={"12px"}
        alignItems={"center"}
      >
        <Image
          src={`/image/wallet/${walletName}.png`}
          width={"26px"}
          height={"26px"}
        />
        <Box>
          <Text
            fontSize={"12px"}
            lineHeight={"20px"}
          >
            {address.slice(0, 4)}...{address.slice(-4)}
          </Text>
          <Text
            color={"#006FEE"}
            fontSize={"12px"}
            lineHeight={"20px"}
          >
            {balance} SOL
          </Text>
        </Box>
      </Flex>
      <Box
        width={"1px"}
        backgroundColor={"#11111126"}
        height={"40px"}
      />
      <Image
        src={`/image/wallet/signout.png`}
        width={"24px"}
        height={"24px"}
        _hover={{ opacity: 0.5 }}
        onClick={disconnect}
        cursor={'pointer'}
      />
    </Flex>
  );
}
