// @ts-nocheck
type TypeBoolean = boolean // true for call, false for put
type TypeUnion = string //'call' | 'put'
type Underlying = Price // current price of underlying
type Vega = number // dPrice/dSigma → dSigma +1 means +100%
type Price = number
type Delta = number
type Gamma = number
type Theta = number
type Rate = number // risk free rate
type Time = number // time to expiry in years
type Sigma = number // volatility
type Strike = number

export interface Option {
    price: Price
    delta: Delta
    gamma: Gamma
    theta: Theta
    vega: Vega
  }

  export class BlackScholes {

    public constructor(args?: {
        priceToSigmaAccuracy?: number
        priceToSigmaBLeft?: number
        priceToSigmaBRight?: number
        priceToSigmaNRIteractions?: number
      }) {      
        this.priceToSigmaAccuracy = args?.priceToSigmaAccuracy ?? 0.001
        this.priceToSigmaBLeft = args?.priceToSigmaBLeft ?? 0
        this.priceToSigmaBRight = args?.priceToSigmaBRight ?? 2
        this.priceToSigmaNRIterations = args?.priceToSigmaNRIteractions ?? 10
      }

  // Cumulative normal distribution function (interpolated, single precision accuracy)
  private CNDF(this: void, x: number): number {
    const a1 = 0.31938153
    const a2 = -0.356563782
    const a3 = 1.781477937
    const a4 = -1.821255978
    const a5 = 1.330274429

    let k1: number
    let k2: number

    if (x < 0) return 1.0 - this.CNDF(-x)
    else if (x > 6) return 1.0
    else {
      k1 = 1.0 / (1.0 + 0.2316419 * x)
      k2 = ((((a5 * k1 + a4) * k1 + a3) * k1 + a2) * k1 + a1) * k1
      return 1.0 - BlackScholes.NDF(x) * k2
    }
  }

      public option(args: {
        rate: Rate
        sigma: Sigma
        strike: Strike
        time: Time
        type: TypeUnion
        underlying: Underlying
      }): Option {
        const { rate, sigma, strike, time, type, underlying } = args
        return this.sigmaToPrice(rate, sigma, strike, time, type === 'call', underlying)
      }

      public sigma(args: {
        price: Price
        rate: Rate
        strike: Strike
        time: Time
        type: TypeUnion
        underlying: Underlying
      }): Sigma {
        const { price, rate, strike, time, type, underlying } = args
        return this.priceToSigma(price, rate, strike, time, type === 'call', underlying)
      }

  // Calculates option params by given historical volatility
  private sigmaToPrice(
    rate: Rate,
    sigma: Sigma,
    strike: Strike,
    time: Time,
    type: TypeBoolean,
    underlying: Underlying,
  ): Option {
    const sqrt_t = Math.sqrt(time)
    const exp_rt = Math.exp(-rate * time)

    const d1 =
      (Math.log(underlying / strike) + rate * time) / (sigma * sqrt_t) + 0.5 * (sigma * sqrt_t)
    const d2 = d1 - sigma * sqrt_t

    const CNDF_d1 = type ? this.CNDF(d1) : -this.CNDF(-d1)
    const CNDF_d2 = type ? this.CNDF(d2) : -this.CNDF(-d2)
    const NDF_d1 = BlackScholes.NDF(d1)

    return {
      delta: CNDF_d1,
      gamma: NDF_d1 / (underlying * sigma * sqrt_t),
      price: underlying * CNDF_d1 - strike * exp_rt * CNDF_d2,
      theta: (underlying * sigma * NDF_d1) / (2 * sqrt_t) + rate * strike * exp_rt * CNDF_d2,
      vega: underlying * sqrt_t * NDF_d1,
    }
  }

    // Implied volatility (Newton-Raphson method)
  private priceToSigma(
    price: Price,
    rate: Rate,
    strike: Strike,
    time: Time,
    type: TypeBoolean,
    underlying: Underlying,
  ): Sigma {
    const ACCURACY = this.priceToSigmaAccuracy
    const ITERATIONS = this.priceToSigmaNRIterations

    // initial guess

    let sigma: Sigma = (Math.sqrt((2 * Math.PI) / time) * price) / underlying

    // iterate

    let option: Option
    let dprice: Price

    for (let i = 0; i < ITERATIONS; i++) {
      option = this.sigmaToPrice(rate, sigma, strike, time, type, underlying)
      dprice = option.price - price

      if (Math.abs(dprice) < ACCURACY) return sigma
      else if (option.vega === 0) return 0
      else sigma -= dprice / option.vega
    }
  }  

    // Normal distribution function
    private static NDF(this: void, x: number): number {
        return Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI)
    }
  }

