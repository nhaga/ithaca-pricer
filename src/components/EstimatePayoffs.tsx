import { Box, SimpleGrid } from '@chakra-ui/react';
import { Plot } from './Plot/Plot'
// import { estimateOrderPayoff } from '../payoffs'

/*
Leg Data:
const data = [{"contractId":231110027,"quantity":"100","side":"BUY"},{"contractId":231110029,"quantity":"100","side":"BUY"},{"contractId":231110029,"quantity":"100","side":"BUY"},{"contractId":231110027,"quantity":"100","side":"BUY"},{"contractId":231110027,"quantity":"100","side":"BUY"}]

Complete with contract info:
const contracts = ...
const completeData = data.map(item => { return {...item, ...contracts.find(c => c.contractId == item.contractId)}})
*/

interface Economics {
    currencyPair: string;
    expiry: number;
    strike: number;
    priceCurrency: string;
    qtyCurrency: string;
}

interface OptionLeg {
    contractId: number;
    quantity: string;
    side: string;
    payoff: string;
    economics: Economics;
    tradeable: boolean;
    premium: number;
  }


const data: OptionLeg[] = [{
    'contractId': 231110027,
    'quantity': '1',
    'side': 'SELL',
    'payoff': 'Call',
    'premium': 2.5,
    'economics': {
        'currencyPair': 'WETH/USDC',
        'expiry': 20231110,
        'strike': 1800.0,
        'priceCurrency': 'USDC',
        'qtyCurrency': 'WETH'
    },
    'tradeable': true
},

]



type Payoff = Record<string, number>;

const range = (start: number, stop: number, step: number = 10) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)


export type PayoffMap = Record<string, number>;

const getZero = (payoffs: PayoffMap[]) => {
    const start = payoffs.find(i => i.total < 0)
    const end = payoffs.filter(i => i.total > 0).at(0)
    if (start && end) {
      const x = start.x - start.total * (end.x-start.x) / (end.total-start.total)
      return {x, total: 0}
    } 
  }
  


function estimateOrderPayoff(legs: OptionLeg[], daysToExpiry: number = 0): Payoff[] {

    const flatVol = 0.6


    const payoffFunctions = (daysToExpiry == 0) ? {
        'Call': (price: number, strike: number) => Math.max(0, price - strike),
        'Put': (price: number, strike: number) => Math.max(0, strike - price),
        'BinaryCall': (price: number, strike: number) => price > strike ? 1 : 0,
        'BinaryPut': (price: number, strike: number) => price < strike ? 1 : 0,
        'Forward': (price: number, strike: number) => price - strike,
    } : {
      'Call': (price: number, strike: number) => Math.max(0, price - strike),
      'Put': (price: number, strike: number) => Math.max(0, strike - price),
      'BinaryCall': (price: number, strike: number) => price > strike ? 1 : 0,
      'BinaryPut': (price: number, strike: number) => price < strike ? 1 : 0,
      'Forward': (price: number, strike: number) => price - strike,


    }

    const prices = range(1798, 1804, 1)

    const payoffs = prices.map(price => {
      const payoff: Payoff = { x: price, total: 0 };
      legs.forEach((leg, idx) => {
        const side = leg.side == "BUY" ? 1 : -1;
        const premium = leg.payoff != 'Forward' ?  -leg.premium * side : 0;
        const intrinsicValue = side * payoffFunctions[leg.payoff as keyof typeof payoffFunctions](price, leg.economics.strike) + premium;
        payoff[`leg${idx+1}`] = intrinsicValue * parseInt(leg.quantity);
        payoff.total += intrinsicValue * parseInt(leg.quantity)
      });
      return payoff;
    });

    payoffs.push(getZero(payoffs))

    return payoffs.sort((a,b) => a.x - b.x);
}



function EstimatePayoffs() {

    const payoffs = estimateOrderPayoff(data)
  return (
    <>
    <table>
        <thead>
        <tr>
            <th>Product</th>
            <th>Strike</th>
            <th>Quantity</th>
            <th>Premium</th>
            <th>Side</th>
        </tr>    
        </thead>
        <tbody>
        {data.map((row, key) => 
        <tr key={key}>
            <td>{row.payoff}</td>
            <td>{row.economics.strike}</td>
            <td>{row.quantity}</td>
            <td>0</td>
            <td>{row.side}</td>
        </tr>
            )}

        </tbody>
    </table>
    <hr></hr>
    <SimpleGrid columns={2} spacing={10}>
    <Box fontSize={"xs"}>
    <pre>
    {JSON.stringify(payoffs, null, "\t")}

    </pre>

    </Box>
    <Box w="96" h="96">
        asdas
    <Plot data={payoffs} />

    </Box>


    </SimpleGrid>
    
    </>
  )
}

export default EstimatePayoffs