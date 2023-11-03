import { useAppSelector, useAppDispatch } from "../../store/hooks"
import {
    addLeg,
    removeLeg,
    updateProduct,
    selectLegs,
    selectProducts
} from "./legsSlice"
import { Table, Tr, Td, Tbody, Thead, Th, TableCaption, Button, Select, Box, Grid, GridItem } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import LegSide from "./LegSide"
import LegQuantity from "./LegQuantity"
import LegProduct from "./LegProduct"
import LegStrike from "./LegStrike"
import { Plot } from '../Plot/Plot'
import { Leg } from "./legsSlice"

import { estimateOrderPayoff } from '../../payoffs'
type Payoff = Record<string, number>;


export function Legs() {
    const [payoff, setPayoff] = useState<Payoff[]>([])

    const legs = useAppSelector(selectLegs)
    const products = useAppSelector(selectProducts)
    const dispatch = useAppDispatch()

    const payload: Leg = {
        id: "35325",
        long: false,
        quantity: 1,
        product: "C",
        strike: 1800,
        premium: 1,
    }

    useEffect(() => {
        const newPayoff: Payoff[] = estimateOrderPayoff(legs)
        setPayoff(newPayoff)
    }, [legs])


    return (
        <>
            <Box w="52" mb="6">
                <Select placeholder="Select product..." onChange={(val) => dispatch(updateProduct(val.target.value))}>
                    {products.map((product) => <option key={product} value={product}>{product}</option>)}
                </Select>

            </Box>
            <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
                <GridItem rowSpan={1} colSpan={2}>
                    <Table size='sm'>
                        <TableCaption>
                            <Button onClick={() => dispatch(addLeg(payload))} size="xs" colorScheme='blue' variant='ghost'>
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
                            {legs.map((leg) =>
                                <Tr key={leg.id}>
                                    <Td>
                                        <LegSide {...leg} />
                                    </Td>
                                    <Td>
                                        <LegQuantity {...leg} />
                                    </Td>
                                    <Td>
                                        <LegProduct {...leg} />
                                    </Td>
                                    <Td>
                                        <LegStrike {...leg} />
                                    </Td>
                                    <Td>{leg.premium}</Td>
                                    <Td>
                                        <Button onClick={() => dispatch(removeLeg(leg.id))} size="xs">X</Button>
                                    </Td>
                                </Tr>
                            )}

                        </Tbody>
                    </Table>
                </GridItem>

                <GridItem rowSpan={1} colSpan={1}>
                    <Plot data={payoff} />
                </GridItem>

            </Grid>

        </>
    )
}
