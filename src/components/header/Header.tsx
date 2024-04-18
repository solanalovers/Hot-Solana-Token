"use client"
import { Box, Button, Container, Flex, Image, Spacer, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import './header.css'
import Link from 'next/link'

export default function Header() {
    const { publicKey } = useWallet()
    const { colorMode } = useColorMode()
    const text = useColorModeValue('light.text', 'dark.text')
    const border = useColorModeValue('light.border', 'dark.border')

    return (
        <Box borderBottom={`1px solid`} borderColor={border}>
            <Container maxW={'1328px'}>
                <Flex paddingY={'16px'} alignItems={'center'}>
                    <Flex alignItems={'center'} columnGap={'32px'}>
                        <Image src={`/image/${colorMode === 'dark' ? 'header-logo.png' : 'header-logo-light.png'}`} width={'48px'} height={'48px'} objectFit={'cover'} />
                        <Link href={''} className={colorMode === 'dark' ? 'header-link' : 'header-link light'}>HOME</Link>
                        <Link href={'/faq'} className={colorMode === 'dark' ? 'header-link' : 'header-link light'}>FAQ</Link>
                        <Link href={'/reward'} className={colorMode === 'dark' ? 'header-link' : 'header-link light'}>REWARD</Link>
                    </Flex>
                    <Spacer />
                    {!publicKey ?
                        <Box
                            height={'40px'}
                            paddingY={'8px'}
                            paddingX={'26px'}
                            backgroundColor={'blue.500'}
                            border={`1px solid`}
                            borderColor={text}
                            position={'relative'}
                            _hover={{opacity: 0.5}}
                            borderRadius={8}
                        >
                            <WalletMultiButton />
                            <Text fontFamily={'heading'}
                                fontSize={'16px'}
                                lineHeight={'24px'}
                                fontWeight={'500'}
                                color={'white'}>Connect wallet</Text>
                        </Box>
                        :
                        <Text width={200}
                            textOverflow={'ellipsis'}
                            overflow={'hidden'}
                            whiteSpace={'nowrap'}>{JSON.stringify(publicKey)}
                        </Text>
                    }
                </Flex>
            </Container>
        </Box>
    )
}
