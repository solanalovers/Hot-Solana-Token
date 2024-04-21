'use client';
import { AppContext } from '@/provider/ProviderWrapper';
import { getRandomWallet } from '@/supabase/getRandomWallet';
import { getTokensData } from '@/supabase/getTokensData';
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
} from '@chakra-ui/react';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import React, { useContext, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Program } from '@coral-xyz/anchor';
import { IDL, VoteToken } from '@/idl';

interface HomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
  getMint,
} from '@solana/spl-token';
import { supabase } from '@/function/supabaseClients';

function HomeDrawer({ isOpen, onClose, data }: HomeDrawerProps) {
  const { publicKey, signAllTransactions } = useWallet();
  const bg = useColorModeValue('light.bg', 'dark.bg');
  const border = useColorModeValue('light.border', 'dark.border');
  const text = useColorModeValue(
    'var(--chakra-colors-blackAlpha-500)',
    'gray.200'
  );
  const text2 = useColorModeValue('light.text', 'dark.text');
  const { isMainnet } = useContext(AppContext);
  const [mintAddress, setMintAddress] = useState('');
  const [amount, setAmount] = useState('0');
  const [numberOfLike, setNumberOfLike] = useState('0');
  const [loading, setLoading] = useState(false);

  const voteToken = async () => {
    setLoading(true);
    try {
      if (publicKey) {
        const connection = new Connection(
          isMainnet
            ? process.env.NEXT_PUBLIC_HELIUS_RPC_MAINNET!
            : process.env.NEXT_PUBLIC_HELIUS_RPC_DEVNET!
        );
        const programId = new PublicKey(process.env.NEXT_PUBLIC_SMART_CONTRACT!);

        const program = new Program<VoteToken>(IDL, programId, {
          connection,
        });

        const mint = new PublicKey(
          isMainnet ? data?.BaseTokenAddress : mintAddress
        );

        const [mintResult] = PublicKey.findProgramAddressSync(
          [Buffer.from('mint'), mint.toBuffer()],
          programId
        );

        const transactions: Transaction[] = [];
        for (let i = 0; i < Number(numberOfLike); i++) {
          const reciever = new PublicKey(await getRandomWallet());

          const fromAta = getAssociatedTokenAddressSync(mint, publicKey);
          const toAta = getAssociatedTokenAddressSync(mint, reciever);
          const mintData = await getMint(connection, mint);

          const createToAtaIns = createAssociatedTokenAccountInstruction(
            publicKey,
            toAta,
            reciever,
            mint
          );

          const transferIns = createTransferCheckedInstruction(
            fromAta,
            mint,
            toAta,
            publicKey,
            10 ** mintData.decimals * Number(amount),
            mintData.decimals
          );

          const tx = new Transaction().add(createToAtaIns).add(transferIns);
          transactions.push(tx);
        }

        const voteIns = await program.methods
          .vote(Number(numberOfLike))
          .accounts({
            voter: publicKey,
            mint: mint,
            mintResult,
            systemProgram: SystemProgram.programId,
          })
          .instruction();

        const tx = new Transaction().add(voteIns);
        transactions.push(tx);

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
          }

          if (isMainnet) {
            let counts = 0;
            if (data?.vote_reuslt && data?.vote_result.length > 0) {
              counts = data.vote_result.counst + 1;
            }

            await supabase.from('vote_result').upsert({
              mint_id: data?.PairId,
              counts: counts,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
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
              <Button
                backgroundColor={'blue.500'}
                color={'white'}
                _hover={{ backgroundColor: 'blue.500', opacity: 0.8 }}
                onClick={async () => {
                  console.log('Vote Token');
                  await voteToken();
                }}
                isLoading={loading}
              >
                LIKE FOR {data?.BaseTokenSymbol}
              </Button>
              <Text color={text} fontSize={'16px'} lineHeight={'24px'}>
                A node is a computer that connects to a cryptocurrency network.
                The node supports the cryptocurrency's network through either
                relaying transactions, validation, or hosting a copy of the
                blockchain. In terms of relaying transactions, each network
                computer (node) has a copy of the blockchain of the
                cryptocurrency it supports.
              </Text>
              <Text color={text} fontSize={'16px'} lineHeight={'24px'}>
                When a transaction is made, the node creating the transaction
                broadcasts details of the transaction using encryption to other
                nodes throughout the node network so that the transaction (and
                every other transaction) is known.
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default React.memo(HomeDrawer);
