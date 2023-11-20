import { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1100',
        put: 13500,
        call: 0,
      },
    {
        name: '1200',
        put: 11500,
        call: 0,
      },
    {
        name: '1300',
        put: 9500,
        call: 0,
      },
    {
        name: '1400',
        put: 8000,
        call: 0,
      },
      {
    name: '1500',
    put: 7000,
    call: 0,
  },
  {
    name: '1600',
    put: 4000,
    call: 0,
  },
  {
    name: '1700',
    put: 2000,
    call: 0,
  },
  {
    name: '1800',
    put: 1000,
    call: 1000,
  },
  {
    name: '1900',
    put: 0,
    call: 2800,
  },
  {
    name: '2000',
    put: 0,
    call: 4800,
  },
  {
    name: '2100',
    put: 0,
    call: 7300,
  },
  {
    name: '2200',
    put: 0,
    call: 8300,
  },
  {
    name: '2300',
    put: 0,
    call: 10300,
  },
  {
    name: '2400',
    put: 0,
    call: 13000,
  },
  {
    name: '2500',
    put: 0,
    call: 15000,
  },
  {
    name: '2600',
    put: 0,
    call: 18000,
  },
];

export default class MaxPain extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="call" fill="#4bb575" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="put" fill="#f93e57" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
