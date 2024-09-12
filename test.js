let items = [
    {x: 1, total: 6},
    {x: 2, total: -4},
    {x: 3, total: -14},
    {x: 4, total: -24},
]

function interp( x1, y1, x2, y2) {
    return y1 - x1 * (y2-y1) / (x2-x1)
} 

   
const xy1 = items.find(i => i.total < 0)
const xy2 = items.filter(i => i.total > 0)[0]


const getZero = (payoffs) => {
    const start = payoffs.find(i => i.total < 0)
    const end = payoffs.filter(i => i.total > 0)[0]
    const x = start.x - start.total * (end.x-start.x) / (end.total-start.total)
    return {x, total: 0}
}


console.log(xy1)

const x = interp(xy1.total, xy1.x, xy2.total, xy2.x)



console.log(x)
console.log(getZero(items))