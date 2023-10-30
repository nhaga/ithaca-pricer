// import { LineChart, Line, CartesianGrid, XAxis, YAxis, , Legend } from 'recharts';
type Payoff = Record<string, number>;

import {
    AreaChart,
    Area,
    Tooltip
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
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <XAxis dataKey="x" /> */}
                {/* <YAxis /> */}
                <Tooltip />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={0.3} />
                        <stop offset={off} stopColor="red" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#5ee192" strokeWidth={4}
                    fill="url(#splitColor)"
                    fillOpacity={0.4}
                />
            </AreaChart>
            {/* <LineChart width={400} height={400} data={data}>
                <Line dataKey="total" dot={false} stroke="#5ee192" strokeWidth={4} />
                {data.length ? Object.keys(data[0]).filter(item => !["x", "total"].includes(item)).map((key, idx) =>
                    <Line key={key} dataKey={key} dot={false} stroke={colors[idx]} strokeDasharray="3 4 5 2" />
                ) : <></>}

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
            </LineChart> */}
        </>
    )
}

