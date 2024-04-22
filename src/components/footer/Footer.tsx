import { Container, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'

export default function Footer() {
  const text = useColorModeValue('light.text', 'dark.text')
  return (
    <Container maxW={'1328'}>
      <Flex paddingBottom={'32px'} alignItems={'center'} justifyContent={'space-between'}>
        <Text
          fontSize={'14px'}
          lineHeight={'16px'}
        >
          Copy right 2024 by HotSolToken
        </Text>


        <Flex alignItems={'center'} columnGap={'8px'}>
          <Text
            fontSize={'14px'}
            lineHeight={'16px'}
          >
            {`In Solana we `}
          </Text>
          <Flex columnGap={'2px'}>
            <Image src='/image/diamond.png' width={'16px'} height={'16px'} />
            <Image src='/image/risinghand.png' width={'16px'} height={'16px'} />
          </Flex>
          <Text
            fontSize={'14px'}
            lineHeight={'16px'}
          >
            {' and '}
          </Text>
          <Image src='/image/heart.png' width={'16px'} height={'16px'} />
        </Flex>
        <Flex alignItems={'center'}>
          <Text
            fontSize={'14px'}
            lineHeight={'16px'}
          >
            {`Donate SOL  to dev team: `}
          </Text>
          <Text
            textDecor={'underline'}
            color={text}
          >
            8KjLx7XNw8Wfc2mFAGpz8pngDX9YyQmoze61bi1dGzoa
          </Text>
        </Flex>
      </Flex>
    </Container>
  )
}
