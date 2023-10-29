import { describe, expect, it } from "vitest";

import { estimateOrderPayoff, range } from "./payoffs";


describe("payoffs", () => {
    it("calculate range", () => {
        const prices = range(100, 500, 50)
        expect(prices).toEqual([100, 150, 200, 250, 300, 350, 400, 450])

    })
    it("should return the correct payoff for a put", () => {
        const legs = [
            {
                id:0,
                long:true,
                quantity: 1,
                product: "P",
                strike: 1600,
                premium : 2
            }
        ];
        const payoffs = estimateOrderPayoff(legs);
        const result = [{"x":1300,"total":298,"leg1":298},{"x":1310,"total":288,"leg1":288},{"x":1320,"total":278,"leg1":278},{"x":1330,"total":268,"leg1":268},{"x":1340,"total":258,"leg1":258},{"x":1350,"total":248,"leg1":248},{"x":1360,"total":238,"leg1":238},{"x":1370,"total":228,"leg1":228},{"x":1380,"total":218,"leg1":218},{"x":1390,"total":208,"leg1":208},{"x":1400,"total":198,"leg1":198},{"x":1410,"total":188,"leg1":188},{"x":1420,"total":178,"leg1":178},{"x":1430,"total":168,"leg1":168},{"x":1440,"total":158,"leg1":158},{"x":1450,"total":148,"leg1":148},{"x":1460,"total":138,"leg1":138},{"x":1470,"total":128,"leg1":128},{"x":1480,"total":118,"leg1":118},{"x":1490,"total":108,"leg1":108},{"x":1500,"total":98,"leg1":98},{"x":1510,"total":88,"leg1":88},{"x":1520,"total":78,"leg1":78},{"x":1530,"total":68,"leg1":68},{"x":1540,"total":58,"leg1":58},{"x":1550,"total":48,"leg1":48},{"x":1560,"total":38,"leg1":38},{"x":1570,"total":28,"leg1":28},{"x":1580,"total":18,"leg1":18},{"x":1590,"total":8,"leg1":8},{"x":1600,"total":-2,"leg1":-2},{"x":1610,"total":-2,"leg1":-2},{"x":1620,"total":-2,"leg1":-2},{"x":1630,"total":-2,"leg1":-2},{"x":1640,"total":-2,"leg1":-2},{"x":1650,"total":-2,"leg1":-2},{"x":1660,"total":-2,"leg1":-2},{"x":1670,"total":-2,"leg1":-2},{"x":1680,"total":-2,"leg1":-2},{"x":1690,"total":-2,"leg1":-2},{"x":1700,"total":-2,"leg1":-2},{"x":1710,"total":-2,"leg1":-2},{"x":1720,"total":-2,"leg1":-2},{"x":1730,"total":-2,"leg1":-2},{"x":1740,"total":-2,"leg1":-2},{"x":1750,"total":-2,"leg1":-2},{"x":1760,"total":-2,"leg1":-2},{"x":1770,"total":-2,"leg1":-2},{"x":1780,"total":-2,"leg1":-2},{"x":1790,"total":-2,"leg1":-2},{"x":1800,"total":-2,"leg1":-2},{"x":1810,"total":-2,"leg1":-2},{"x":1820,"total":-2,"leg1":-2},{"x":1830,"total":-2,"leg1":-2},{"x":1840,"total":-2,"leg1":-2},{"x":1850,"total":-2,"leg1":-2},{"x":1860,"total":-2,"leg1":-2},{"x":1870,"total":-2,"leg1":-2},{"x":1880,"total":-2,"leg1":-2},{"x":1890,"total":-2,"leg1":-2},{"x":1900,"total":-2,"leg1":-2},{"x":1910,"total":-2,"leg1":-2},{"x":1920,"total":-2,"leg1":-2},{"x":1930,"total":-2,"leg1":-2},{"x":1940,"total":-2,"leg1":-2},{"x":1950,"total":-2,"leg1":-2},{"x":1960,"total":-2,"leg1":-2},{"x":1970,"total":-2,"leg1":-2},{"x":1980,"total":-2,"leg1":-2},{"x":1990,"total":-2,"leg1":-2}]
        expect(payoffs).toEqual(result);
    });
});