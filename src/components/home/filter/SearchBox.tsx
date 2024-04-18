'use client';
import { Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'

export default function SearchBox() {
    const border = useColorModeValue('gray.800', 'gray.200')
    return (
        <InputGroup
            flex={1}
            size={'xs'}
        >
            <InputLeftElement pointerEvents='none'>
                <SearchIcon />
            </InputLeftElement>
            <Input
                placeholder='Search by token name, address, symbol or id'
                _placeholder={{
                    color: 'gray.400',
                    fontFamily: 'cpl'
                }}
                borderColor={border}
            />
        </InputGroup>
    )
}
