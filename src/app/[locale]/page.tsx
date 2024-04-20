"use client"
import HomeFilter from '@/components/home/HomeFilter'
import HomeFooter from '@/components/home/HomeFooter'
import HomeHeading from '@/components/home/HomeHeading'
import HomeTableList from '@/components/home/HomeTableList'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
// import HomeHeading from '../components/home/HomeHeading'
// import HomeFilter from '../components/home/HomeFilter'
// import HomeTableList from '../components/home/HomeTableList'
// import HomeFooter from '../components/home/HomeFooter'
import { useState } from 'react'


export default function Home() {
    const border = useColorModeValue('light.border', 'dark.border')
    const [filter, setFilter] = useState({
        time: '1h',
        top: '100'
    })
    return (
        <Box>
            <Container maxW={'1328px'} paddingY={'24px'}>
                <HomeHeading />
                <HomeFilter filter={filter} handleChangeFilter={(value: string, type: string) => setFilter((prev: any) => ({ ...prev, [type]: value }))} />
                <HomeTableList />
            </Container>
            <Box borderTop={`1px solid`} borderColor={border}>
                <Container maxW={'1328px'}>
                    <HomeFooter />
                </Container>
            </Box>
        </Box>
    )
}
