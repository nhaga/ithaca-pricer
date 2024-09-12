import { useAppSelector, useAppDispatch } from "../../store/hooks"
import {
    addLeg,
    removeLeg,
    updateLeg,
    selectLegs,
} from "./legsSlice"
import { Table, Tr, Td, Tbody, Thead, Th, TableCaption, Button, Grid, GridItem } from "@chakra-ui/react"
import { Checkbox, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, SliderMark, Flex} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import LegSide from "./LegSide"
import LegQuantity from "./LegQuantity"
import LegProduct from "./LegProduct"
import LegStrike from "./LegStrike"
import LegExpiry from "./LegExpiry"
import { Plot } from '../Plot/Plot'
import { Leg } from "./legsSlice"
import axios from 'axios'

import { estimateOrderPayoff, blackVanillaPrice, blackDigitalPrice } from '../../payoffs'
type Payoff = Record<string, number>;


export function Legs() {
    const [payoff, setPayoff] = useState<Payoff[]>([])
    const [spotPrice, setSpotPrice] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sliderValue, setSliderValue] = useState(7)
    const [maxExpiry, setMaxExpiry] = useState(0)

    const legs = useAppSelector(selectLegs)
    const dispatch = useAppDispatch()

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }


        
    useEffect(() => {
        const fetchSpotPrice = async () => {
            console.log(legs)
        const currentDate = new Date().toISOString().slice(0,10);
          try {
            const response = await axios.get(`https://app.canary.ithacanoemon.tech/api/calc/forward?date=${currentDate}&currency=ETH`);            
            setSpotPrice(response.data.toFixed(2));
          } catch (error) {
            console.error('Error fetching spot price:', error);
          }
        };
    
        fetchSpotPrice();
        const intervalId = setInterval(fetchSpotPrice, 5000);
    
        return () => clearInterval(intervalId);
      }, []);    


    const payload: Leg = {
        id: "35325",
        long: true,
        expiry: 7,
        quantity: 1,
        product: "C",
        strike: 2200,
        premium: 1,
    }

    const updatePrice = async (leg) => {
        console.log("Updating price...")

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

        const currentDate = new Date()
        const futureDate = addDays(currentDate, leg.expiry);
    
        const expiry = futureDate.toISOString().slice(0,10) 
        const res = await axios.get(`https://app.canary.ithacanoemon.tech/api/calc/price?payoff=${leg.product}&date=${expiry}&strike=${leg.strike}&currency=ETH`)
        dispatch(updateLeg({ ...leg, premium: parseFloat(res.data.toFixed(3)) }))
    }


    useEffect(() => {
        const newPayoff: Payoff[] = estimateOrderPayoff(legs, sliderValue)
        setPayoff(newPayoff)
        // legs.forEach(updatePrice)
        const newMaxExpiry = Math.max(...legs.map(leg => leg.expiry))
        setSliderValue(Math.min(sliderValue, newMaxExpiry))
        setMaxExpiry(newMaxExpiry)
    }, [legs, sliderValue])

    return (
        <>
            <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
                <GridItem>
                    <Table>
                        <Thead>
                            
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Th>Spot</Th>
                                <Td>{spotPrice}</Td>
                            </Tr>
                            <Tr>
                                <Th>Max Expiry</Th>
                                <Td>{maxExpiry}</Td>
                            </Tr>
                            <Tr>
                                <Th>
                                    Days to Expiry
                                </Th>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Box p={4} pt={6} mt={6}>
      <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)} min={1} max={maxExpiry} step={1}>

        <SliderMark
          value={sliderValue}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-5'
          w='12'
        >
          {maxExpiry - sliderValue}d
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>

                </GridItem>
                <GridItem>
                    <Plot data={payoff} />
                </GridItem>
            </Grid>


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
                                <Th>Expiry</Th>
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
                                    <Td>
                                    <LegExpiry {...leg} />
                                    </Td>
                                    <Td>
                                        {leg.premium}
                                        </Td>
                                    <Td>
                                        <Button onClick={() => dispatch(removeLeg(leg.id))} size="xs">X</Button>
                                    </Td>
                                </Tr>
                            )}

                        </Tbody>
                    </Table>
                    {/* <Box fontSize={"xs"}>
                        <pre>
                    { JSON.stringify(payoff, null, "\t") }

                        </pre>
                    </Box> */}


                </GridItem>

            </Grid>

        </>
    )
}
