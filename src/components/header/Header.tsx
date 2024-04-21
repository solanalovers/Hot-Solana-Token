'use client';
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './header.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import LocaleSelect from './localeComponent/LocaleSelect';
import ClusterSelect from './solanaCluster/ClusterSelect';

export default function Header() {
  const { publicKey } = useWallet();
  const { colorMode } = useColorMode();
  const text = useColorModeValue('light.text', 'dark.text');
  const border = useColorModeValue('light.border', 'dark.border');
  const locale = useLocale();
  const pathname = usePathname();

  const navlink = [
    {
      label: 'HOME',
      value: `/${locale}`,
    },
    {
      label: 'FAQ',
      value: `/${locale}/faq`,
    },
    {
      label: 'REWARD',
      value: `/${locale}/reward`,
    },
  ];

  return (
    <Box borderBottom={`1px solid`} borderColor={border}>
      <Container maxW={'1328px'}>
        <Flex paddingY={'16px'} alignItems={'center'}>
          <Flex alignItems={'center'} columnGap={'32px'}>
            <Link href={'/'}>
              <Image
                src={`/image/${
                  colorMode === 'dark'
                    ? 'header-logo.png'
                    : 'header-logo-light.png'
                }`}
                width={'48px'}
                height={'48px'}
                objectFit={'cover'}
              />
            </Link>
            {navlink.map((link: any, idx: number) => (
              <Link
                key={idx}
                href={link.value}
                className={`${
                  colorMode === 'dark' ? 'header-link' : 'header-link light'
                } ${pathname === link.value && 'active'}`}
              >
                {link.label}
              </Link>
            ))}
          </Flex>
          <Spacer />
          <Flex alignItems={'center'} columnGap={'16px'}>
            <ClusterSelect />
            <LocaleSelect />
            {!publicKey ? (
              <Box
                height={'40px'}
                paddingY={'8px'}
                paddingX={'26px'}
                backgroundColor={'blue.500'}
                border={`1px solid`}
                borderColor={text}
                position={'relative'}
                _hover={{ opacity: 0.5 }}
                borderRadius={8}
              >
                <WalletMultiButton />
                <Text
                  fontFamily={'heading'}
                  fontSize={'16px'}
                  lineHeight={'24px'}
                  fontWeight={'500'}
                  color={'white'}
                >
                  Connect wallet
                </Text>
              </Box>
            ) : (
              <Text
                width={200}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
              >
                {JSON.stringify(publicKey)}
              </Text>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
