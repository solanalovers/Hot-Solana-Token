'use client';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { HomeFilterInterface } from '../../../interface/home-interface'

export default function FilterSelect({ filter, filterList, handleChangeFilter }: { filter: string, filterList: Array<HomeFilterInterface>, handleChangeFilter: (value: string) => void }) {
    const text = useColorModeValue('light.text', 'dark.text')
    const separate = useColorModeValue('black', 'white')
    return (
        <Flex alignItems={'center'} columnGap={'28px'}>
            <Flex alignItems={'center'} columnGap={'10px'}>
                {filterList.map((item: HomeFilterInterface, idx: number) => (
                    <Flex key={idx} alignItems={'center'} columnGap={'10px'}>
                        <Text
                            color={item.value === filter ? text : ''}
                            fontSize={'14px'}
                            lineHeight={'22px'}
                            cursor={'pointer'}
                            onClick={() => handleChangeFilter(item.value)}
                        >
                            {item.label}
                        </Text>
                        {idx + 1 !== filterList.length &&
                            <Box width={'1px'} height={'10px'} backgroundColor={separate} />
                        }
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}
