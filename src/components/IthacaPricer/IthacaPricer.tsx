import { Box } from '@chakra-ui/react'
import { Grid, GridItem, Center, Text, VStack, Flex } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    HStack,
    FormLabel,
    Input,
    FormControl,
    Switch    
  } from '@chakra-ui/react'
  import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


  interface InputProps {
    title: string,
    value: number,  
  }

  const CustomInput = (props: InputProps) => {
    return (
      <HStack spacing={2} align="center">
        <FormLabel w="40">{props.title}</FormLabel>
        <Input
          w="20"
          type='text'
          value={props.value}
          size="sm"
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
        />
      </HStack>
    )
  }


function IthacaPricer() {
  return (
    <Card>
      <CardBody>

      <Grid
        w='1000px'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4}
>
  <GridItem rowSpan={2} colSpan={2} >
  <TableContainer>
  <Table size='sm'>
    <Tbody>
      <Tr>
        <Th>Coin</Th>
        <Td>
          <Select size="sm">
            <option value='option1'>ETH/USD</option>
          </Select>          
        </Td>
      </Tr>
      <Tr>
        <Th>Maturity</Th>
        <Td>
        <Select size="sm">
            <option value='option1'>26-Jan</option>
            <option value='option1'>26-Feb</option>
            <option value='option1'>26-Mar</option>
          </Select>          
        </Td>
      </Tr>
      <Tr>
        <Th>Strike</Th>
        <Td>
        <Select size="sm">
            <option value='option1'>2400</option>
            <option value='option1'>2500</option>
            <option value='option1'>2600</option>
          </Select>          
        </Td>
      </Tr>
      <Tr>
        <Th>Flavor</Th>
        <Td>
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
              Call
            </FormLabel>
            <Switch id='email-alerts' />
            <FormLabel htmlFor='email-alerts' mb='0' ml="4">
              Put
            </FormLabel>

          </FormControl>          
        </Td>
      </Tr>
      <Tr>
        <Th></Th>
        <Td>
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
              Vanilla
            </FormLabel>
            <Switch id='email-alerts' />
            <FormLabel htmlFor='email-alerts' mb='0' ml="4">
              Digital
            </FormLabel>

          </FormControl>          
        </Td>
      </Tr>      
    </Tbody>

  </Table>
  </TableContainer>



  </GridItem>
  <GridItem colSpan={3} >

  <TableContainer>
  <Table size='sm'>
    <Thead>
      <Tr>
        <Th></Th>
        <Th isNumeric>Market</Th>
        <Th isNumeric>Our Market</Th>
        <Th isNumeric>Our Market</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Th>Spot</Th>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Th>Vol</Th>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Th>Fwd</Th>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Th>Maturity</Th>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>---</Td>

      </Tr>
      <Tr>
        <Td>Price</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>Delta</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>Gamma</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>Theta</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>Vega</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>W. Vega</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>dVega/dVol</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>dVega/dSpot (ETH)</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>dVega/dSpot (USD)</Td>
        <Td isNumeric>2540</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

  </GridItem>
</Grid>



        <Grid templateColumns='repeat(2, 1fr)' gap={2}>
            <GridItem w='100%' bg='blue.500' >
                <VStack>
                <Flex color='white'>
                <Center w='100px' >
                    <Text>Coin</Text>
                </Center>
                <Center bg="green.500">
                    <Text>ETH/USD</Text>
                </Center>
                </Flex>

            <Flex color='white'>
                <Center w='100px' >
                    <Text>Maturity</Text>
                </Center>
                <Center bg="green.500">
                <Select placeholder='Select option'>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
                </Center>
                </Flex>
                <Flex color='white'>
                <Center w='100px' >
                    <Text>Maturity</Text>
                </Center>
                <Center bg="green.500">
                <Select placeholder='Select option'>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
                </Center>
                </Flex>
                <Flex color='white'>
                <Center w='100px' >
                    <Text>Maturity</Text>
                </Center>
                <Center bg="green.500">
                <Select placeholder='Select option'>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
                </Center>
                </Flex>

                </VStack>
                

            </GridItem>
            
        <GridItem w='100%' h='10' bg='blue.500' />
</Grid>


{/* <TableContainer>
  <Table variant='simple'  size='sm'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>Product</Th>
        <Th>Maturity</Th>
        <Th>Strike</Th>
        <Th>Payoff</Th>
        <Th>Notional</Th>
        <Th>Price</Th>
        <Th>Delta</Th>
        <Th>Vega</Th>
        <Th>WVega</Th>
        <Th>Gamma</Th>
        <Th>Theta</Th>
        <Th>Vanna</Th>
        <Th>Volga</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Call</Td>
        <Td>26.jan</Td>
        <Td isNumeric>2500</Td>
        <Td>Call</Td>
        <Td isNumeric>1</Td>
        <Td isNumeric>5.26</Td>
        <Td isNumeric>0.37</Td>
        <Td isNumeric>20</Td>
        <Td isNumeric>20</Td>
        <Td isNumeric>20</Td>
        <Td isNumeric>20</Td>
        <Td isNumeric>20</Td>
        <Td isNumeric>20</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th></Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer> */}
</CardBody>

    </Card>
  )
}

export default IthacaPricer