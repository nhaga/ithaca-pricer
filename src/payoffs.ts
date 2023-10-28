
//
// interface IthacaOptionLeg {
//     contractId: number;
//     side: 'BUY' | 'SELL';
//     quantity: number;
// }

interface OptionLeg {
    type: "call" | "put";
    side: 'BUY' | 'SELL';
    strike: number;
    contracts: number;
    premium: number;
  }


const range = (start, stop, step = 10) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

export function estimateOrderPayoff(legs: OptionLeg[]): number[] {
    const payoffFunctions = {
        C: (price: number, strike: number) => Math.max(0, price - strike),
        P: (price: number, strike: number) => Math.max(0, strike - price),
        BC: (price: number, strike: number) => price > strike ? 1 : 0,
        BP: (price: number, strike: number) => price < strike ? 1 : 0,
        F: (price: number, strike: number) => price - strike,
    }

    const prices = range(1300, 2000, 10)

    const payoffs = prices.map(price => {
      const payoff = {x: price, total: 0};
      legs.forEach((leg, idx) => {
        const side = leg.long ? 1 : -1;
        const premium = leg.product != 'F' ?  -leg.premium * side : 0;
        const intrinsicValue = side * payoffFunctions[leg.product](price, leg.strike) + premium;
        payoff[`leg${idx+1}`] = intrinsicValue * leg.quantity;
        payoff.total += intrinsicValue * leg.quantity
      });
      return payoff;
    });
    return payoffs;
}

