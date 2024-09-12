import {
    Tooltip,
    XAxis,
    LineChart,
    YAxis,
    Legend,
    Line
} from "recharts";
import { Checkbox, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, SliderMark, Flex} from '@chakra-ui/react'
import { useState } from 'react'


type Payoff = Record<string, number>;

export function Plot({ data }: { data: Payoff[] }) {

    const [showLegs, setShowLegs] = useState(true)
    const [sliderValue, setSliderValue] = useState(7)

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }

    const colors = [
        "rgba(195, 40, 96, 0.2)",
        "rgba(255, 172, 100, 0.2)",
        "rgba(88, 188, 116, 0.2)",
        "#F5FBEF",
        "#92AD94",
        "#748B75",
    ]


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

    const legKeys = data.length && Object.keys(data[0]).filter(key => key.includes("@") )
    const totalKeys = data.length && Object.keys(data[0]).filter(key => key.includes("total") )

    function extractIntegers(arr) {
        return arr.map(str => {
          const match = str.match(/\d+/);
          return match ? parseInt(match[0]) : null;
        });
      }

    const expiries = data.length && extractIntegers(totalKeys);






    return (
        <>




        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
        
          { showLegs && data.length && legKeys.map(key => <Line key={key} type="monotone" dataKey={key} stroke="#82ca9d"  dot={false} /> )}
          {data.length && totalKeys.map(key => 
          <Line key={key} type="monotone" dataKey={key} stroke="#8884d8"  strokeWidth={3}  dot={false} /> 
          )}
          
        </LineChart>

        <Checkbox 
                    isChecked={showLegs}
                    onChange={() => setShowLegs(!showLegs)}
        
        >Show Legs</Checkbox>



        </>
    )
}
