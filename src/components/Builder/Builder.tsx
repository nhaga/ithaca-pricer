import { Select, Button, Box, Grid, GridItem, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody } from '@chakra-ui/react'
import { products } from './products'
import { useEffect, useState } from 'react'
import { BuilderRow } from './BuilderRow'
import { Plot } from '../Plot/Plot'
import { estimateOrderPayoff } from '../../payoffs'


const productMap = {
  "F": "forward",
  "C": "call",
  "BC": "BinaryCall",
  "BP": "BinaryPut",
  "P": "Put"
}


function Builder() {
  const [legs, setLegs] = useState([])
  const [payoff, setPayoff] = useState([])

  const updateAttribute = (index, attribute, value) => {
    const newLegs = [...legs]
    if (attribute == 'long') {
      let record = legs.find((leg) => leg.id === index)
      record.long = !record.long

    } else {
      const record = legs.find((leg) => leg.id === index)
      record[attribute] = value

    }
    setLegs(newLegs)
  }


  const addLeg = () => {
    setLegs([...legs, { id: self.crypto.randomUUID(), long: true, quantity: 1, product: 'F', strike: 1500, premium: 0 }])
  }

  const removeLeg = (index) => {
    setLegs(legs.filter((leg) => leg.id !== index))
  }

  const changeProduct = (product) => {
    if (product) {
      setLegs(products[product])
    } else {
      setLegs([])
    }
  }

  useEffect(() => {
    const newPayoff = estimateOrderPayoff(legs)
    setPayoff(newPayoff)
  }, [legs])



  return (
    <Box>
      <Box w="96" py="2">
        <Select placeholder='Select Product...' onChange={(val) => changeProduct(val.target.value)}>
          <option value='bet'>Bet</option>
          <option value='earn'>Earn</option>
          <option value='no gain no pain'>No Gain, No Payin</option>
          <option value='up in call'>Up & In Call</option>
          <option value='up out call'>Up & Out Call</option>
          <option value='down in put'>Down & In Put</option>
          <option value='down out put'>Down & Out Put</option>
          <option value='bonus'>Bonus</option>
          <option value='twin win'>Twin-Win</option>
        </Select>

      </Box>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        <GridItem rowSpan={1} colSpan={2}>
          <TableContainer>

            <Table>
              <TableCaption>
                <Button onClick={() => addLeg()} size="xs" colorScheme='blue' variant='ghost'>
                  + Add Position
                </Button>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Side</Th>
                  <Th>Qty</Th>
                  <Th>Product</Th>
                  <Th>Strike</Th>
                  <Th>Prem.</Th>
                </Tr>
              </Thead>
              <Tbody>
                {legs.map(leg => <BuilderRow
                  key={leg.id}
                  leg={leg}
                  removeLeg={removeLeg}
                  setLegs={setLegs}
                  updateAttribute={updateAttribute}
                />
                )}
              </Tbody>


            </Table>
          </TableContainer>

        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Plot data={payoff} />
        </GridItem>

      </Grid>
    </Box>
  )
}

export default Builder