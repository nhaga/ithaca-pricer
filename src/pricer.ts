
export interface Option {
    price: number
    delta: number
    gamma: number
    theta: number
    vega: number
}

export class BlackScholes {

    public constructor() {}

    // Normal distribution function
    private static NDF(this: void, x: number): number {
        return Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI)
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

        // if (x < 0) return 1.0 - this.CNDF(-x)
        if (x > 6) return 1.0
        else {
        k1 = 1.0 / (1.0 + 0.2316419 * x)
        k2 = ((((a5 * k1 + a4) * k1 + a3) * k1 + a2) * k1 + a1) * k1
        return 1.0 - BlackScholes.NDF(x) * k2
        }
    }

    public option(args: {
      rate: number
      sigma: number
      strike: number
      time: number
      type: string
      underlying: number
    }): Option {
      const { rate, sigma, strike, time, type, underlying } = args
      return this.fromSigma(rate, sigma, strike, time, type === 'call', underlying)
    }

    public sigma(args: {
      price: number
      rate: number
      strike: number
      time: number
      type: string
      underlying: number
    }): number {
      const { price, rate, strike, time, type, underlying } = args
      return this.toSigma(price, rate, strike, time, type === 'call', underlying)
    }



    fromSigma(    
        rate: number,
        sigma: number,
        strike: number,
        time: number,
        type: boolean,
        underlying: number
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

    toSigma(
        price: number,
        rate: number,
        strike: number,
        time: number,
        type: boolean,
        underlying: number,
      ): number {

        const ACCURACY = 0.001
        const ITERATIONS = 10

        // initial guess
        let sigma: number = (Math.sqrt((2 * Math.PI) / time) * price) / underlying

        // iterate
        let option: Option
        let dprice: number

        for (let i = 0; i < ITERATIONS; i++) {
            option = this.fromSigma(rate, sigma, strike, time, type, underlying)
            dprice = option.price - price
      
            if (Math.abs(dprice) < ACCURACY) return sigma
            else if (option.vega === 0) return 0
            else sigma -= dprice / option.vega
        }
        return sigma
      }
}