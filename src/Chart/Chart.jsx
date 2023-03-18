import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

function Chart() {

  const [bartekData, setBartekData] = useState([]);
  const [janekData, setJanekData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/api/runs')
      .then((res) => {
        const all = res.data;
        const bartek = all.filter((el) => el.name === "Bartek").sort((a,b) => a.kilometers-b.kilometers);
        const janek = all.filter((el) => el.name === "Janek").sort((a,b) => a.kilometers-b.kilometers);
        handleFilter(bartek,setBartekData)
        handleFilter(janek,setJanekData)
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  function handleFilter(data,func) {
    const seenKilometers = {};
    const filteredData = [];

    for (const obj of data) {
      if (!(obj.kilometers in seenKilometers)) {
        filteredData.push(obj);
        seenKilometers[obj.kilometers] = obj.paceInSeconds;
      } else {
        if (obj.paceInSeconds < seenKilometers[obj.kilometers]) {
          filteredData.splice(
            filteredData.findIndex(x => x.kilometers === obj.kilometers),
            1,
            obj
          );
          seenKilometers[obj.kilometers] = obj.paceInSeconds;
        }
      }
    }
    console.log(filteredData)
    func(filteredData);
  }

  return (
    <div className="bg-white rounded-lg max-w-2xl mx-auto mt-12 py-6 shadow-1">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 8,
            bottom: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis label={{ value: 'Rodzaj Biegu', position: 'bottom', offset: '-6' }} dataKey="kilometers" domain={['dataMin', 'dataMax']} type="number" tickFormatter={(x) => x+"km"}/>
          <YAxis label={{ value: 'Tempo', angle: -90, position: 'left', offset: '-10' }} type='number' domain={['dataMin', 'dataMax']} tickCount={8} tickFormatter={(x) => Math.floor(x / 60) + ":" + String(x % 60).padStart(2, '0')} />
          <Tooltip name="lol" formatter={(value) => Math.floor(value / 60) + ":" + String(value % 60).padStart(2, '0')} labelFormatter={(x) => x+"km"} />
          <Legend verticalAlign='top' />
          <Line name="Jasiel" type="monotone" strokeWidth={3} dot={{ strokeWidth: 2 }} data={janekData} dataKey="paceInSeconds" stroke="#8884d8" />
          <Line name="Bartoszek" type="monotone" strokeWidth={3} dot={{ strokeWidth: 2 }} data={bartekData} dataKey="paceInSeconds" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart
