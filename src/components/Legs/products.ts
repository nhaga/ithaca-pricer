export const products = {
    "Straddle": [
        { id: "0", long: true, quantity: 1, product: 'C', strike: 2000, premium: 20 },
        { id: "1", long: true, quantity: 1, product: 'P', strike: 2000, premium: 20 },
    ],
    "Bet": [
        { id: "0", long: true, quantity: 100, product: 'BC', strike: 2000, premium: 4 },
        { id: "1", long: false, quantity: 100, product: 'BC', strike: 2100, premium: 2 },
    ],
    "Earn": [
        { id: "0", long: false, quantity: 1, product: 'P', strike: 2100, premium: 40 },

    ],
    'No Gain no Pain': [
        { id: "0", long: true, quantity: 1, product: 'C', strike: 1700, premium: 10 },
        { id: "1", long: false, quantity: 10, product: 'BC', strike: 1700, premium: 1 },
    ],
    'Up n In Call': [
        { id: "0", long: true, quantity: 1, product: 'C', strike: 1700, premium: 10 },
        { id: "1", long: true, quantity: 200, product: 'BC', strike: 1700, premium: 1 },
    ],
    'Up n Out Call': [
        { id: "0", long: true, quantity: 1, product: 'C', strike: 1500, premium: 2 },
        { id: "1", long: false, quantity: 1, product: 'C', strike: 1700, premium: 1 },
        { id: "2", long: false, quantity: 200, product: 'BC', strike: 1700, premium: 0 },
    ],
    'Down In Put': [
        { id: "0", long: true, quantity: 1, product: 'P', strike: 1400, premium: 10 },
        { id: "1", long: true, quantity: 200, product: 'BP', strike: 1400, premium: 1 },
    ],
    'Down Out Put': [
        { id: "0", long: true, quantity: 1, product: 'P', strike: 1600, premium: 2 },
        { id: "1", long: false, quantity: 1, product: 'P', strike: 1400, premium: 1 },
        { id: "2", long: false, quantity: 200, product: 'BP', strike: 1400, premium: 0 },
    ],
    'Bonus': [
        { id: "0", long: true, quantity: 1, product: 'P', strike: 1600, premium: 2 },
        { id: "1", long: false, quantity: 1, product: 'P', strike: 1400, premium: 1 },
        { id: "2", long: false, quantity: 200, product: 'BP', strike: 1400, premium: 0 },
        { id: "3", long: true, quantity: 1, product: 'F', strike: 1600, premium: 2 },
    ],
    'Twin Win': [
        { id: "0", long: true, quantity: 2, product: 'P', strike: 1600, premium: 2 },
        { id: "1", long: false, quantity: 2, product: 'P', strike: 1400, premium: 1 },
        { id: "2", long: false, quantity: 400, product: 'BP', strike: 1400, premium: 0 },
        { id: "3", long: true, quantity: 1, product: 'F', strike: 1600, premium: 2 },
    ]
}
