import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    const all = props.data;
    console.log(all);
    processData(all);

  }, [props.data])

  function processData(all) {
    // Initialize a Set to keep track of unique kilometers
    const kilometersSet = new Set(all.map(entry => entry.kilometers));

    // Initialize a Map to store the output data
    const outputMap = new Map(Array.from(kilometersSet).map(kilometers => [kilometers, { kilometers, Janek: null, Bartek: null }]));

    // Loop through the input array and populate the output Map
    all.forEach(entry => {
      const outputEntry = outputMap.get(entry.kilometers);
      if (entry.name === "Janek") {
        outputEntry.Janek = entry.paceInSeconds;
      } else if (entry.name === "Bartek") {
        outputEntry.Bartek = entry.paceInSeconds;
      }
    });

    // Output the result as an array
    const outputArray = Array.from(outputMap.values());
    outputArray.sort((a, b) => a.kilometers - b.kilometers);
    setData(outputArray);
    console.log(outputArray);
  }

  return (
    <div className="bg-white rounded-lg max-w-2xl mx-auto mt-6 py-6 shadow-1">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 8,
            bottom: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis label={{ value: 'Rodzaj Biegu', position: 'bottom', offset: '-6' }} dataKey="kilometers" domain={['dataMin', 'dataMax']} type="number" tickFormatter={(x) => x + "km"} />
          <YAxis label={{ value: 'Tempo', angle: -90, position: 'left', offset: '-10' }} type='number' domain={['dataMin', 'dataMax']} tickCount={8} tickFormatter={(x) => Math.floor(x / 60) + ":" + String(x % 60).padStart(2, '0')} />
          <Tooltip formatter={(value) => Math.floor(value / 60) + ":" + String(value % 60).padStart(2, '0')} labelFormatter={(x) => x + "km"} />
          <Legend verticalAlign='top' />
          <Line connectNulls="true" name="Jasiel" type="monotone" strokeWidth={3} dot={{ strokeWidth: 2 }} dataKey="Janek" stroke="#8884d8" />
          <Line connectNulls="true" name="Bartoszek" type="monotone" strokeWidth={3} dot={{ strokeWidth: 2 }} dataKey="Bartek" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart
