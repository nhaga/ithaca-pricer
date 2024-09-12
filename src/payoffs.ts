interface OptionLeg {
    product: string;
    strike: number;
    expiry: string;
    premium: number;
    quantity: number;
    long: boolean;
  }

type Payoff = Record<string, number>;

export const range = (start: number, stop: number, step: number = 10) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

const getZero = (payoffs: Payoff[]) => {
  const start = payoffs.findLast(i => i.total < 0)
  const end = payoffs.filter(i => i.total > 0).at(0)
  console.log(start, end)
  if (start && end) {
    const x = start.x - start.total * (end.x-start.x) / (end.total-start.total)
    return {x, total: 0}
  } 
}


function _n(x: number) {
  const a1 = 0.31938153;
  const a2 = -0.356563782;
  const a3 = 1.781477937;
  const a4 = -1.821255978;
  const a5 = 1.330274429;
  const k = 1 / (1 + 0.2316419 * Math.abs(x));
  const cdf =
    1 -
    (1 / Math.sqrt(2 * Math.PI)) *
      Math.exp((-x * x) / 2) *
      (a1 * k + a2 * k * k + a3 * k * k * k + a4 * k * k * k * k + a5 * k * k * k * k * k);
  return x < 0 ? 1 - cdf : cdf;
}


function blackFormulaExtended(isCall: boolean, f: number, k: number, t: number, sigma: number): OptionExtended {
  const d1 = (Math.log(f / k) + 0.5 * sigma ** 2 * t) / (sigma * Math.sqrt(t));
  const d2 = d1 - sigma * Math.sqrt(t);

  const pdfD1 = Math.exp(-0.5 * d1 ** 2) / Math.sqrt(2 * Math.PI);
  const price = isCall ? f * _n(d1) - k * _n(d2) : k * _n(-d2) - f * _n(-d1);
  const delta = isCall ? _n(d1) : - _n(-d1);
  const gamma = pdfD1 / (f * sigma * Math.sqrt(t));
  const vega = f * pdfD1 * Math.sqrt(t);

  const theta = (f * pdfD1 * sigma) / (2 * Math.sqrt(t));
  const volga = (vega * d1 * d2) / sigma;

  return { price, delta, gamma, vega, theta, volga };
}

export function blackVanillaPrice(isCall: boolean, f: number, k: number, t: number, sigma: number): number {
  return blackFormulaExtended(isCall, f, k, t, sigma).price;
}

export function blackDigitalPrice(isCall: boolean, f: number, k: number, t: number, sigma: number): number {
  const d1 = (Math.log(f / k) + 0.5 * sigma ** 2 * t) / (sigma * Math.sqrt(t));
  const d2 = d1 - sigma * Math.sqrt(t);
  return isCall ? _n(d2) : _n(-d2);
}


export function estimateOrderPayoff(legs: OptionLeg[], daysToExpiry: number = 0): Payoff[] {
    const flatVol = 0.6
    const payoffFunctions =  {
        'C': (price: number, strike: number) => Math.max(0, price - strike),
        'P': (price: number, strike: number) => Math.max(0, strike - price),
        'BC': (price: number, strike: number) => price > strike ? 1 : 0,
        'BP': (price: number, strike: number) => price < strike ? 1 : 0,
        'F': (price: number, strike: number) => price - strike,
    }

    const priceFunctions = {
      'C': (leg: OptionLeg, price: number) => blackVanillaPrice(true, price, leg.strike, Math.max(parseInt(leg.expiry) - daysToExpiry, 0) / 365.25, flatVol),
      'P': (leg: OptionLeg, price: number) => blackVanillaPrice(false, price, leg.strike, Math.max(parseInt(leg.expiry) - daysToExpiry, 0) / 365.25, flatVol),
      'BC': (leg: OptionLeg, price: number) => blackDigitalPrice(true, price, leg.strike, Math.max(parseInt(leg.expiry) - daysToExpiry, 0) / 365.25, flatVol),
      'BP': (leg: OptionLeg, price: number) => blackDigitalPrice(false, price, leg.strike, Math.max(parseInt(leg.expiry) - daysToExpiry, 0) / 365.25, flatVol),
      'F': (leg: OptionLeg, price: number) => price - leg.strike,
    }

    const prices = range(1471, 3505, 1)

    const payoffs = prices.map(price => {


      const payoff: Payoff = { x: price };

      const expiries = [...new Set(legs.map(leg => leg.expiry))]
      expiries.forEach(expiry => {
        payoff['total' + expiry] = 0
      })



      legs.forEach((leg, idx) => {
        const side = leg.long ? 1 : -1;
        let legValue
        if (daysToExpiry == 0) {
          const premium = leg.product != 'F' ?  -leg.premium * side : 0;
          legValue = side * payoffFunctions[leg.product as keyof typeof payoffFunctions](price, leg.strike) + premium;
        } else {
          legValue = side * priceFunctions[leg.product as keyof typeof payoffFunctions](leg, price)
        }

        const label = `${leg.product} ${leg.expiry}d @${leg.strike}`
        payoff[label] = legValue * leg.quantity;
        payoff['total' + leg.expiry] += legValue * leg.quantity
      });
      return payoff;
    });
    // payoffs.push(getZero(payoffs))

    return payoffs.sort((a,b) => a.x - b.x);
}