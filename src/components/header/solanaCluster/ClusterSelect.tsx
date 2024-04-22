"use client";
import { AppContext } from "@/provider/AppAdapter";
import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";

export default function ClusterSelect() {
  const clusterList = ["Mainnet", "Devnet"];
  const { isMainnet, setIsMainnet } = useContext(AppContext);
  return (
    <Menu>
      <MenuButton
        width={"130px"}
        as={Button}
        rightIcon={
          <TriangleDownIcon
            width={"16px"}
            height={"16px"}
          />
        }
        backgroundColor={"transparent"}
      >
        <Flex
          alignItems={"center"}
          columnGap={"8px"}
        >
          <Text
            fontFamily={"cp"}
            fontWeight={400}
          >
            {isMainnet ? "Mainnet" : "Devnet"}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        {clusterList.map((item: any, idx: number) => (
          <MenuItem
            key={idx}
            onClick={() => {
              
              setIsMainnet((prevIsMainnet: boolean) => {
                localStorage.setItem("isMainnet", JSON.stringify(!prevIsMainnet));
                return !prevIsMainnet
              });
            }}
          >
            <Flex
              alignItems={"center"}
              columnGap={"8px"}
            >
              <Text
                fontFamily={"cp"}
                fontWeight={400}
              >
                {item}
              </Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
