'use client'

import {
  Box,
  Stack,
  Heading,
  Container,
  SimpleGrid,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'

import Pricer from './components/Pricer';
import { Legs } from './components/Legs/Legs'
import ColorChanger from './components/ColorChanger';

export default function App() {
  return (
    <Box position={'relative'}>
      <ColorChanger />

      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 1 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>

          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Ithaca Tests
          </Heading>
          <Tabs colorScheme='green'>
            <TabList>
              <Tab>Legs</Tab>
              <Tab>Pricer</Tab>
            </TabList>

            <TabPanels py="10">
              <TabPanel>
                <Legs />
              </TabPanel>
              <TabPanel >
                <Pricer />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  )
}