type Payoff = Record<string, number>;

import {
    AreaChart,
    Area,
    Tooltip,
} from "recharts";



export function Plot({ data }: { data: Payoff[] }) {

    // const colors = [
    //     "rgba(195, 40, 96, 0.2)",
    //     "rgba(255, 172, 100, 0.2)",
    //     "rgba(88, 188, 116, 0.2)",
    //     "#F5FBEF",
    //     "#92AD94",
    //     "#748B75",
    // ]


    const gradientOffset = () => {
        console.log
        const dataMax = Math.max(...data.map((i) => i.total));
        const dataMin = Math.min(...data.map((i) => i.total));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();




    return (
        <>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                }}
            >
                <defs>
                    <linearGradient id='fillGradient' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#5ee192' stopOpacity={0.4} />
                        <stop offset={off} stopColor='#8884d8' stopOpacity={0} />
                        <stop offset='95%' stopColor='#FF3F57' stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id='lineGradient' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='8%' stopColor='#5ee192' stopOpacity={0.3} />
                        <stop offset={off} stopColor='#fff' stopOpacity={0.8} />
                        <stop offset='92%' stopColor='#FF3F57' stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <Tooltip />
                <Area
                    type="linear"
                    stroke='url(#lineGradient)'
                    dataKey="total"
                    strokeWidth={3}
                    fill="url(#fillGradient)"
                />
                {/* <ReferenceLine y={0} stroke='white' /> */}

            </AreaChart>
        </>
    )
}

