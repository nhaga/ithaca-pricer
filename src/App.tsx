'use client'

import {
  Box,
  Container,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react'

import Nav from './components/Nav';
import { Legs } from './components/Legs/Legs'

export default function App() {
  const bg = useColorModeValue('white', 'gray.900');
  return (
    <Box bg={bg} h="100%">
      <Nav />
      <Box position={'relative'}>


        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 1 }}
          spacing={{ base: 10, lg: 32 }}
          py={10}>
            <Legs />
        </Container>
      </Box>
    </Box>

  )
}