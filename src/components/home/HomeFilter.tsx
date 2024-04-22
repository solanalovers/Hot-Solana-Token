"use client";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import FilterSelect from "./filter/FilterSelect";
import { timeFilter, topFilter } from "../../constant/home-constant";
import SearchBox from "./filter/SearchBox";

export default function HomeFilter({ filter, handleChangeFilter }: any) {
  const text = useColorModeValue("light.text", "dark.text");

  return (
    <Flex
      marginTop={"32px"}
      marginBottom={"24px"}
      columnGap={"60px"}
      alignItems={"center"}
    >
      {/* <Text
        color={text}
        fontSize={"14px"}
        lineHeight={"22px"}
      >
        TRENDING
      </Text> */}
      {/* <FilterSelect filter={filter.time} filterList={timeFilter} handleChangeFilter={(value: string) => handleChangeFilter(value, 'time')} /> */}
      <FilterSelect
        filter={filter.top}
        filterList={topFilter}
        handleChangeFilter={(value: string) => handleChangeFilter(value, "top")}
      />
      <SearchBox />
    </Flex>
  );
}
