'use client'

import {
  Box,
  Stack,
  Container,
  SimpleGrid,
  Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue
} from '@chakra-ui/react'

import Nav from './components/Nav';
import Pricer from './components/Pricer';
import { Legs } from './components/Legs/Legs'
import CrosschainDeposit from './components/CrosschainDeposit/CrosschainDeposit';
import Collateral from './components/Collateral/Collateral';
import SDK from './components/SDK/SDK';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';
import EstimatePayoffs from './components/EstimatePayoffs';


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





          <Stack spacing={{ base: 10, md: 20 }}>

            <Tabs colorScheme='green'>
              <TabList>
                <Tab>Legs</Tab>
                <Tab>Pricer</Tab>
                <Tab>Dashboard</Tab>
                <Tab>Analytics</Tab>
                <Tab>Payoffs</Tab>
                <Tab>Cross chain Deposits</Tab>
                <Tab>Collateral Yield</Tab>
                <Tab>SDK</Tab>
              </TabList>

              <TabPanels py="10">
                <TabPanel>
                  <Legs />
                </TabPanel>
                <TabPanel >
                  <Pricer />
                </TabPanel>
                <TabPanel>
                  <Dashboard />
                </TabPanel>
                <TabPanel>
                  <Analytics />
                </TabPanel>
                <TabPanel>
                  <EstimatePayoffs />
                </TabPanel>
                <TabPanel>
                  <CrosschainDeposit />
                </TabPanel>
                <TabPanel>
                  <Collateral />
                </TabPanel>
                <TabPanel>
                  <SDK />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Container>
      </Box>
    </Box>

  )
}