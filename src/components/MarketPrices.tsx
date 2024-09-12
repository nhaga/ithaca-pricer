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
  } from '@chakra-ui/react'

  import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


const range = (start: number, stop: number, step: number = 10) =>
Array(Math.ceil((stop - start) / step))
.fill(start)
.map((x, y) => x + y * step);


function MarketPrices() {

    const root = 0.01

    const prices = range(2000, 3000, 100).map((strike, idx) => { 
        return { 
            deribitBid: root + idx*root - Math.random()*0.005,
            deribitAsk: root + idx*root + Math.random()*0.005,
            ithacaMid: root + idx*root,

        }
    })
    console.log(prices)



  return (
    <Card>
        <CardBody>

    <TableContainer>
  <Table variant='simple' size="sm">
    <Thead>
      <Tr>
        <Th isNumeric>Deribit Bid</Th>
        <Th isNumeric>Deribit Ask</Th>
        <Th isNumeric>Ithaca Mid</Th>
      </Tr>
    </Thead>
    <Tbody>
        {prices.map(row => 
      <Tr>
      <Td isNumeric>{row.deribitBid.toFixed(4)}</Td>
      <Td isNumeric>{row.deribitAsk.toFixed(4)}</Td>
      <Td isNumeric>{row.ithacaMid.toFixed(4)}</Td>
    </Tr>

            )}
    </Tbody>
  </Table>
</TableContainer>
        </CardBody>

    </Card>
  )
}

export default MarketPrices