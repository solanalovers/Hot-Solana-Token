"use client";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

export default function SearchBox({ getTokenList, handleSearch }: any) {
  const border = useColorModeValue("gray.800", "gray.200");
  const [value, setValue] = useState("");
  return (
    <InputGroup
      flex={1}
      size={"xs"}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input
        placeholder="Search by token name, address, symbol or id"
        _placeholder={{
          color: "gray.400",
          fontFamily: "cpl",
        }}
        borderColor={border}
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(value);
          }
        }}
      />
      {value && (
        <InputRightElement>
          <CloseIcon
            cursor={"pointer"}
            onClick={() => {
              setValue("");
              getTokenList();
            }}
            _hover={{ opacity: 0.5 }}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
