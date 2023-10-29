import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
type Payoff = Record<string, number>;

export function Plot({ data }: { data: Payoff[] }) {

    const colors = [
        "rgba(195, 40, 96, 0.2)",
        "rgba(255, 172, 100, 0.2)",
        "rgba(88, 188, 116, 0.2)",
        "#F5FBEF",
        "#92AD94",
        "#748B75",
    ]



    return (
        <>
            <LineChart width={400} height={400} data={data}>
                <Line dataKey="total" dot={false} stroke="#8884d8" strokeWidth={4} />
                {data.length ? Object.keys(data[0]).filter(item => !["x", "total"].includes(item)).map((key, idx) =>
                    <Line key={key} dataKey={key} dot={false} stroke={colors[idx]} strokeDasharray="3 4 5 2" />
                ) : <></>}

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
            </LineChart>
        </>
    )
}

