import { describe, expect, it } from "vitest";


import { BlackScholes, Option } from "./ithacaPricer";

let blackScholes: BlackScholes;
let option: Option;
let precision: number;
let sigma: number;

describe("option", () => {
    blackScholes = new BlackScholes();
    precision = 5;
  
    describe("normal prices", () => {
      // online calculator
      // https://www.math.drexel.edu/~pg/fin/VanillaCalculator.html
  



      
      it("call", () => {
          const option = blackScholes.option({
            rate: 0.00,
            sigma: 0.485,
            strike: 1850,
            time: 0.0739726,
            type: "call",
            underlying: 1805,
          });
        expect(option.price).toBeCloseTo(75.268, precision);
      });
  
      it("put", () => {
        const option = blackScholes.option({
            rate: 0.00,
            sigma: 0.485,
            strike: 1850,
            time: 0.0739726,
            type: "put",
            underlying: 1805,
          });
        expect(option.price).toBeCloseTo(120.2684, precision);
      });
    });

    describe("greeks", () => {
        option = blackScholes.option({
            rate: 0.0,
            sigma: 0.485,
            strike: 1850,
            time: 0.07397,
            type: "call",
            underlying: 1805,
          });
        it("delta", () => {
              expect(option.delta).toBeCloseTo(0.45195, precision);
        })
        it("gamma", () => {
            expect(option.gamma).toBeCloseTo(0.0016, precision);
        })
        it("theta", () => {
            expect(option.theta).toBeCloseTo(637.391, precision);
        })
        it("vega", () => {
            expect(option.vega).toBeCloseTo(194.424047, precision);
        })



    })
    describe("corner cases", () => {
        // credits: https://github.com/MattL922/black-scholes/blob/master/black-scholes.js
    
        describe("t>0, v>0", () => {
          it("call", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0.2,
              strike: 34,
              time: 0.25,
              type: "call",
              underlying: 30,
            });
            expect(option.price).toBeCloseTo(0.23834902311961947, precision);
          });
    
          it("put", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0.2,
              strike: 34,
              time: 0.25,
              type: "put",
              underlying: 30,
            });
            expect(option.price).toBeCloseTo(3.5651039155492974, precision);
          });
        });
    
        describe("t>0, v=0, out-of-the-money", () => {
          it("call", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0.25,
              type: "call",
              underlying: 30,
            });
            expect(option.price).toBe(0);
          });
    
          it("put", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0.25,
              type: "put",
              underlying: 35,
            });
            expect(option.price).toBe(0);
          });
        });
    
        describe("t=0, v>0, out-of-the-money", () => {
          it("call", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0.1,
              strike: 34,
              time: 0,
              type: "call",
              underlying: 30,
            });
            expect(option.price).toBe(0);
          });
    
          it("put", () => {
            // underlying, strike, time, sigma, rate, type
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0.1,
              strike: 34,
              time: 0,
              type: "put",
              underlying: 35,
            });
            expect(option.price).toBe(0);
          });
        });
    
        describe("t=0, v=0, out-of-the-money", () => {
          it("call", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0,
              type: "call",
              underlying: 30,
            });
            expect(option.price).toBe(0);
          });
    
          it("put", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0,
              type: "put",
              underlying: 35,
            });
            expect(option.price).toBe(0);
          });
        });
    
        describe("t>0, v=0, in-the-money", () => {
    
          it("call", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0.25,
              type: "call",
              underlying: 36,
            });
            expect(option.price).toBeCloseTo(2.673245107570324, precision);
          });
    
          it("put", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0.25,
              type: "put",
              underlying: 32,
            });
            expect(option.price).toBeCloseTo(1.3267548924296761, precision);
          });
        });
    
        describe("t=0, v>0, in-the-money", () => {
          it("call", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0.1,
              strike: 34,
              time: 0,
              type: "call",
              underlying: 36,
            });
            expect(option.price).toBe(2);
          });
    
          it("put", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0.1,
              strike: 34,
              time: 0,
              type: "put",
              underlying: 32,
            });
            expect(option.price).toBe(2);
          });
        });
    
        describe("t=0, v=0, in-the-money", () => {
          it("call", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0,
              type: "call",
              underlying: 36,
            });
            expect(option.price).toBe(2);
          });
    
          it("put", () => {
            option = blackScholes.option({
              rate: 0.08,
              sigma: 0,
              strike: 34,
              time: 0,
              type: "put",
              underlying: 32,
            });
            expect(option.price).toBe(2);
          });
        });
      });
    
})

describe("sigma", () => {
    precision = 3;
  
    const rate: number = 0.1;
    const strike: number = 90;
    const time: number = 0.5;
    const type: "call" | "put" = "call";
    const underlying: number = 100;
  
  
    it("newton-raphson", () => {
      blackScholes = new BlackScholes();
  
      option = blackScholes.option({
        rate,
        sigma: 0.8,
        strike,
        time,
        type,
        underlying,
      });
      expect(option.price).toBeCloseTo(28.61495, precision);
  
      sigma = blackScholes.sigma({
        price: option.price,
        rate,
        strike,
        time,
        type,
        underlying,
      });
      expect(sigma).toBeCloseTo(0.8, precision);
    });

    it("newton-raphson, zero sigma", () => {
        blackScholes = new BlackScholes({
            priceToSigmaAccuracy: 20
          
        });
    
        sigma = blackScholes.sigma({
          price: 1000,
          rate,
          strike,
          time,
          type,
          underlying,
        });
        expect(sigma).toBeCloseTo(0.0, precision);
      });
  
  
  });
  