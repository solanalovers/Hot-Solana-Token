'use client';
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
} from '@chakra-ui/react'
import { tempHomeList } from '../../constant/home-constant'

export default function HomeTableList() {
  const border = useColorModeValue('light.border', 'dark.border')
  const text = useColorModeValue('light.text', 'dark.text')
  const tokenName = useColorModeValue('var(--chakra-colors-blackAlpha-800)', 'white')

  return (
    <TableContainer>
      <Table variant='unstyle'>
        <Thead borderColor={border} borderBottom={'1px solid'}>
          <Tr>
            <Th>IDs</Th>
            <Th>TOKENS</Th>
            <Th>VOTE</Th>
            <Th>SYMBOL</Th>
            <Th>ADDRESS</Th>
            <Th>TOTAL VOTES</Th>
            <Th>DEX</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tempHomeList.map((data: any, idx: number) => (
            <Tr key={idx}>
              <Td>{data.id}</Td>
              <Td>
                <Flex alignItems={'center'} columnGap={'8px'}>
                  <Image src='/image/token-img.png' width={'32px'} height={'32px'} objectFit={'cover'} objectPosition={'center'} />
                  <Box>
                    <Text
                      fontSize={'12px'}
                      lineHeight={'16px'}
                      color={tokenName}
                    >
                      {data.token.name}
                    </Text>
                    <Text
                      fontSize={'12px'}
                      lineHeight={'16px'}
                      color={'gray.600'}
                    >
                      {data.token.desc}
                    </Text>
                  </Box>
                </Flex>
              </Td>
              <Td>
                <Button backgroundColor={'blue.500'} paddingX={'8px'} paddingY={'4px'}>
                  <Text color={'white'} fontSize={'12px'} lineHeight={'16px'}>VOTE</Text>
                </Button>
              </Td>
              <Td>{data.symbol}</Td>
              <Td>
                <Link color={text} textDecoration={'underline'} href={`https://solscan.io/address/${data.address}`} isExternal>
                  {data.address.slice(0, 4)}...{data.address.slice(-4)}
                </Link>
              </Td>
              <Td>{data.total}</Td>
              <Td>
                <Link color={text} textDecoration={'underline'} href={data.dex} isExternal>
                  {data.dex}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
