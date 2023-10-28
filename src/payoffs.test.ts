import { describe, expect, it, beforeEach } from "vitest";

import { estimateOrderPayoff } from "./payoffs";


describe("payoffs", () => {
    it("should return the correct payoff for a call", () => {
        const legs = [
            {
                type: "call",
                side: "BUY",
                strike: 100,
                contracts: 1,
                premium: 0,
            },
        ];
        const prices = [50, 100, 150];
        const payoffs = estimateOrderPayoff(legs, prices);
        expect(payoffs).toEqual([0, 0, 50]);
    });
});