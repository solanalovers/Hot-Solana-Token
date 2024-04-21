"use client";
import HomeFilter from "@/components/home/HomeFilter";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeading from "@/components/home/HomeHeading";
import HomeTableList from "@/components/home/HomeTableList";
import { getTokensData } from "@/supabase/getTokensData";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
// import HomeHeading from '../components/home/HomeHeading'
// import HomeFilter from '../components/home/HomeFilter'
// import HomeTableList from '../components/home/HomeTableList'
// import HomeFooter from '../components/home/HomeFooter'
import { useEffect, useState } from "react";

export default function Home() {
  const border = useColorModeValue("light.border", "dark.border");
  const [tokenList, setTokenList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState({
    time: "1h",
    top: "100",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: tokenList, count }: any = await getTokensData(page);
      if (tokenList) {
        setTotal(count);
        setTokenList(tokenList);
      }
      setLoading(false);
    })();
  }, [page]);

  return (
    <Box>
      <Container
        maxW={"1328px"}
        paddingY={"24px"}
      >
        <HomeHeading />
        <HomeFilter
          filter={filter}
          handleChangeFilter={(value: string, type: string) =>
            setFilter((prev: any) => ({ ...prev, [type]: value }))
          }
        />
        <HomeTableList
          tokenList={tokenList}
          loading={loading}
        />
      </Container>
      <Box
        borderTop={`1px solid`}
        borderColor={border}
      >
        <Container maxW={"1328px"}>
          <HomeFooter
            total={total}
            setPage={setPage}
            page={page}
          />
        </Container>
      </Box>
    </Box>
  );
}
