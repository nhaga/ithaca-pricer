'use client'

import {
    Box,
    Flex,
    Button,
    Container,
    Stack,
    useColorMode,
    Image,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import logo from '../assets/logo.png'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Box bg={'gray.900'} px={4}>
                <Container maxW={'7xl'}>
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <Box>
                            <Image src={logo} alt="logo" />
                        </Box>

                        <Flex alignItems={'center'}>
                            <Stack direction={'row'} spacing={7}>
                                <ConnectButton label="Sign in" chainStatus="icon" showBalance={false} />
                                <Button onClick={toggleColorMode}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>

                            </Stack>
                        </Flex>
                    </Flex>

                </Container>
            </Box>
        </>
    )
}