'use client';
import { getRandomWallet } from '@/supabase/getRandomWallet';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  Flex,
  Image,
  Text,
  Button,
  InputGroup,
  InputRightAddon,
  Input,
  Link,
  Box,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import React, { useContext, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ShyftSdk, Network } from '@shyft-to/js';
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
  getMint,
  getAccount,
  TOKEN_2022_PROGRAM_ID,
} from '@solana/spl-token';
import { AppContext } from '@/provider/AppAdapter';
import { vote } from '@/function/vote';
import Error from 'next/error';

interface HomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

function HomeDrawer({ isOpen, onClose, data }: HomeDrawerProps) {
  const toast = useToast();
  const { publicKey, signAllTransactions } = useWallet();
  const bg = useColorModeValue('light.bg', 'dark.bg');
  const border = useColorModeValue('light.border', 'dark.border');
  const text = useColorModeValue(
    'var(--chakra-colors-blackAlpha-500)',
    'gray.200'
  );
  const text2 = useColorModeValue('light.text', 'dark.text');
  const { isMainnet } = useContext(AppContext);
  const [mintAddress, setMintAddress] = useState(
    '8P8rSfV6uYkkPwxwPTYXBsvea2ZntzZ1c6M3Y2hwKJ7U'
  );
  const [amount, setAmount] = useState('');
  const [numberOfLike, setNumberOfLike] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Need connect wallet to vote');

  const connection = new Connection(
    isMainnet
      ? process.env.NEXT_PUBLIC_HELIUS_RPC_MAINNET!
      : process.env.NEXT_PUBLIC_HELIUS_RPC_DEVNET!
  );
  const handleMouseEnter = () => {
    if (disabled) {
      setIsTooltipOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
  };

  const handleDisable = async () => {
    if (
      !publicKey ||
      !process.env.NEXT_PUBLIC_SHYFT_XAPI_KEY ||
      !data?.BaseTokenAddress
    ) {
      setDisabled(true);
      return;
    } else {
      try {
        const shyft = new ShyftSdk({
          apiKey: process.env.NEXT_PUBLIC_SHYFT_XAPI_KEY!,
          network: isMainnet ? Network.Mainnet : Network.Devnet,
        });
        const res = await shyft.wallet.getTokenBalance({
          wallet: publicKey.toString(),
          token: isMainnet ? data?.BaseTokenAddress : mintAddress,
        });
        console.log(res);

        if (res.balance === 0) {
          throw new Error({ statusCode: 200, title: '' });
        }

        setDisabled(false);
      } catch (error) {
        setDisabled(true);
        setErrorMsg('You need to have this token to vote');
        return;
      }
    }
  };

  useEffect(() => {
    handleDisable();
  }, [publicKey, mintAddress, data?.BaseTokenAddress]);

  const voteToken = async () => {
    setLoading(true);
    try {
      if (publicKey && !disabled) {
        const mint = new PublicKey(
          isMainnet ? data?.BaseTokenAddress : mintAddress
        );

        const transactions: Transaction[] = [];
        for (let i = 0; i < Number(numberOfLike); i++) {
          const reciever = new PublicKey(await getRandomWallet());

          const shyft = new ShyftSdk({
            apiKey: process.env.NEXT_PUBLIC_SHYFT_XAPI_KEY!,
            network: isMainnet ? Network.Mainnet : Network.Devnet,
          });

          const mintData: any = await shyft.wallet.getTokenBalance({
            wallet: publicKey.toString(),
            token: isMainnet ? data?.BaseTokenAddress : mintAddress,
          });

          const associated_account = new PublicKey(
            mintData?.associated_account
          );

          const fromAta = getAssociatedTokenAddressSync(mint, publicKey);

          let is_token_2022 = false;

          console.log(associated_account.toString(), fromAta.toString());

          if (associated_account.toString() !== fromAta.toString()) {
            is_token_2022 = true;
          }

          const toAta = getAssociatedTokenAddressSync(
            mint,
            reciever,
            undefined,
            is_token_2022 ? TOKEN_2022_PROGRAM_ID : undefined
          );

          const createToAtaIns = createAssociatedTokenAccountInstruction(
            publicKey,
            toAta,
            reciever,
            mint,
            is_token_2022 ? TOKEN_2022_PROGRAM_ID : undefined
          );

          const transferIns = createTransferCheckedInstruction(
            is_token_2022 ? associated_account : fromAta,
            mint,
            toAta,
            publicKey,
            10 ** mintData?.info?.decimals * Number(amount),
            mintData?.info?.decimals,
            [],
            is_token_2022 ? TOKEN_2022_PROGRAM_ID : undefined
          );

          const tx = new Transaction().add(createToAtaIns).add(transferIns);
          transactions.push(tx);
        }

        if (signAllTransactions) {
          const block = await connection.getLatestBlockhash();
          transactions.forEach((ta) => {
            ta.recentBlockhash = block.blockhash;
            ta.feePayer = publicKey;
          });

          const signedTransactions = await signAllTransactions(transactions);
          console.log(
            'User has signed ' + signedTransactions.length + ' transactions'
          );

          for (const ta of signedTransactions) {
            const txid = await connection.sendRawTransaction(ta.serialize(), {
              skipPreflight: false,
            });
            console.log(txid);

            const res = await connection.confirmTransaction(txid, 'confirmed');
            console.log(res);
          }

          if (isMainnet) {
            await vote({
              mintId: data?.PairId,
              numberOfLike: Number(numberOfLike),
            });
          }
        }
        toast({
          position: 'top-right',
          status: 'success',
          description: 'Vote Success',
          size: 'lg',
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        position: 'top-right',
        status: 'error',
        description: error.message,
        size: 'lg',
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={bg} paddingX={'24px'} paddingY={'32px'}>
          <DrawerBody>
            <Flex columnGap={'12px'} marginBottom={'22px'}>
              <Image
                src={`${data?.imageUrl}` || '/image/token-image-2.png'}
                width={'86px'}
                height={'86px'}
                objectFit={'cover'}
                objectPosition={'center'}
              />
              <Flex flexDirection={'column'} rowGap={'4px'} overflow={'hidden'}>
                <Text fontSize={'24px'} lineHeight={'32px'}>
                  {data?.BaseTokenName}
                </Text>
                <Text color={text2} fontSize={'16px'} lineHeight={'24px'}>
                  {data?.BaseTokenSymbol}
                </Text>
                <Link
                  noOfLines={1}
                  textOverflow={'ellipsis'}
                  textDecoration={'underline'}
                  href={`https://solscan.io/token/${data?.BaseTokenAddress}`}
                  isExternal
                  color={text2}
                  fontSize={'14px'}
                  lineHeight={'20px'}
                  _hover={{ opacity: 0.5 }}
                >
                  {data?.BaseTokenAddress}
                </Link>
                <Flex
                  marginTop={'8px'}
                  alignItems={'center'}
                  columnGap={'12px'}
                >
                  {data?.typesocials_Pair && (
                    <Link href={data?.urlsocials_Pair} isExternal>
                      <Image
                        src={`/image/social/${data?.typesocials_Pair}.png`}
                        width={'32px'}
                        height={'32px'}
                      />
                    </Link>
                  )}
                  {data?.typesocials && (
                    <Link href={data?.urlsocials} isExternal>
                      <Image
                        src={`/image/social/${data?.typesocials}.png`}
                        width={'32px'}
                        height={'32px'}
                      />
                    </Link>
                  )}
                  {data?.urlweb && (
                    <Link href={data?.urlweb} isExternal>
                      <Image
                        src='/image/social/web.png'
                        width={'32px'}
                        height={'32px'}
                      />
                    </Link>
                  )}
                </Flex>
              </Flex>
            </Flex>
            <Flex
              borderTop={'1px solid'}
              borderTopColor={border}
              paddingTop={'16px'}
              flexDirection={'column'}
              rowGap={'16px'}
            >
              <Box>
                {!isMainnet && (
                  <>
                    <Text>Token mint</Text>
                    <Input
                      placeholder='Enter token mint in devnet to test'
                      fontSize={'16px'}
                      _placeholder={{
                        color: 'gray.400',
                      }}
                      marginBottom={'20px'}
                      marginTop={'4px'}
                      onChange={(e) => setMintAddress(e?.target?.value)}
                    />
                  </>
                )}

                <InputGroup>
                  <Input
                    type='number'
                    placeholder='Enter amount to send (per like)'
                    fontSize={'16px'}
                    _placeholder={{
                      color: 'gray.400',
                    }}
                    onChange={(e) => setAmount(e?.target?.value)}
                  />
                  <InputRightAddon>
                    <Flex columnGap={'10px'}>
                      <Image
                        src={`${data?.imageUrl}` || '/image/token-image-2.png'}
                        width='20px'
                        height={'20px'}
                      />
                      <Text fontSize={'16px'} lineHeight={'24px'}>
                        {data?.BaseTokenSymbol}
                      </Text>
                    </Flex>
                  </InputRightAddon>
                </InputGroup>
                <Text fontSize={'11px'} lineHeight={'19px'} color={text}>
                  with per like, you will need to pay ~0.00205 sol to solana
                  network
                </Text>
              </Box>
              <InputGroup>
                <Input
                  type='number'
                  placeholder='Enter amount to like (min: 10)'
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  onChange={(e) => setNumberOfLike(e?.target?.value)}
                />
                <InputRightAddon>
                  <Image src='/image/thumbup.svg' />
                </InputRightAddon>
              </InputGroup>
              <Tooltip
                label={errorMsg}
                isOpen={isTooltipOpen}
                placement='bottom'
              >
                <Button
                  backgroundColor={'blue.500'}
                  color={'white'}
                  _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
                  _hover={{ backgroundColor: 'blue.500', opacity: 0.8 }}
                  onClick={async () => {
                    await voteToken();
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  isLoading={loading}
                  isDisabled={!numberOfLike || !amount || disabled}
                >
                  LIKE FOR {data?.BaseTokenSymbol}
                </Button>
              </Tooltip>

              <Text color={text} fontSize={'16px'} lineHeight={'24px'}>
                To LIKE a token, you must have this token in your wallet.
              </Text>
              <Text color={text} fontSize={'16px'} lineHeight={'24px'}>
                Initiating a transaction that sends tokens to a random address
                within hotsolanatoken.xyz system effectively generates a LIKE
                for that token.
              </Text>
              <Text color={text} fontSize={'16px'} lineHeight={'24px'}>
                With per LIKE, you only need to send a small amount of token,
                such as 0.0001 (minimum amount required by the token)
              </Text>
              <Text color={text} fontSize={'16px'} lineHeight={'24px'}>
                A token can receive a maximum of one million LIKEs.
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default HomeDrawer;
