export const products = {
    'bet': [
        { id: 0, long: true, quantity: 100, product: 'BC', strike: 1700, premium: 4 },
        { id: 1, long: false, quantity: 100, product: 'BC', strike: 1900, premium: 2 },
    ],
    'earn': [
        { id: 0, long: false, quantity: 1, product: 'P', strike: 1700, premium: 4 },

    ],
    'no gain no pain': [
        { id: 0, long: true, quantity: 1, product: 'C', strike: 1700, premium: 10 },
        { id: 1, long: false, quantity: 10, product: 'BC', strike: 1700, premium: 1 },
    ],
    'up in call': [
        { id: 0, long: true, quantity: 1, product: 'C', strike: 1700, premium: 10 },
        { id: 1, long: true, quantity: 200, product: 'BC', strike: 1700, premium: 1 },
    ],
    'up out call': [
        { id: 0, long: true, quantity: 1, product: 'C', strike: 1500, premium: 2 },
        { id: 1, long: false, quantity: 1, product: 'C', strike: 1700, premium: 1 },
        { id: 2, long: false, quantity: 200, product: 'BC', strike: 1700, premium: 0 },
    ],
    'down in put': [
        { id: 0, long: true, quantity: 1, product: 'P', strike: 1400, premium: 10 },
        { id: 1, long: true, quantity: 200, product: 'BP', strike: 1400, premium: 1 },
    ],
    'down out put': [
        { id: 0, long: true, quantity: 1, product: 'P', strike: 1600, premium: 2 },
        { id: 1, long: false, quantity: 1, product: 'P', strike: 1400, premium: 1 },
        { id: 2, long: false, quantity: 200, product: 'BP', strike: 1400, premium: 0 },
    ],
    'bonus': [
        { id: 0, long: true, quantity: 1, product: 'P', strike: 1600, premium: 2 },
        { id: 1, long: false, quantity: 1, product: 'P', strike: 1400, premium: 1 },
        { id: 2, long: false, quantity: 200, product: 'BP', strike: 1400, premium: 0 },
        { id: 3, long: true, quantity: 1, product: 'F', strike: 1600, premium: 2 },
    ],
    'twin win': [
        { id: 0, long: true, quantity: 2, product: 'P', strike: 1600, premium: 2 },
        { id: 1, long: false, quantity: 2, product: 'P', strike: 1400, premium: 1 },
        { id: 2, long: false, quantity: 400, product: 'BP', strike: 1400, premium: 0 },
        { id: 3, long: true, quantity: 1, product: 'F', strike: 1600, premium: 2 },
    ]
}
