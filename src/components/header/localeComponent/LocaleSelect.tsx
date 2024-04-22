"use client";
import { localeList } from "@/constant/localeItemConstant";
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
import React from "react";
import { useLocale } from "next-intl";
import { useRouter as useLocaleRouter } from "@/navigation";

export default function LocaleSelect() {
  const locale = useLocale();
  const localeRouter = useLocaleRouter();

  const getCurrentLocale = () => {
    return localeList.filter((item: { label: string; value: string }) => {
      return item.value === locale;
    })[0].label;
  };
  return (
    <Menu>
      <MenuButton
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
          <Image
            src={`/image/locale/${locale}.png`}
            width={"20px"}
            height={"14px"}
          />
          <Text
            fontFamily={"cp"}
            fontWeight={400}
          >
            {getCurrentLocale()}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        {localeList.map(
          (
            item: { label: string; value: string; icon: string },
            idx: number
          ) => (
            <MenuItem
              key={idx}
              onClick={() =>
                localeRouter.replace("/pathnames", { locale: item.value })
              }
            >
              <Flex
                alignItems={"center"}
                columnGap={"8px"}
              >
                <Image
                  src={item.icon}
                  width={"20px"}
                  height={"14px"}
                />
                <Text
                  fontFamily={"cp"}
                  fontWeight={400}
                >
                  {item.label}
                </Text>
              </Flex>
            </MenuItem>
          )
        )}
      </MenuList>
    </Menu>
  );
}
