import runLogo from "./img/running.svg"
import plusLogo from "./img/plus.svg"
import Chart from "./Chart/Chart";
import { useState, useEffect } from "react";
import axios from "axios";
import NewRun from "./NewRun/NewRun";

function App() {
  const [adding, setAdding] = useState(false)
  const [chosen, setChosen] = useState(null)
  const [runs, setRuns] = useState(null)

  function chooseBartek(){
    setAdding(true);
    setChosen("bartek");
  }

  function chooseJanek(){
    setAdding(true);
    setChosen("janek");
  }

  useEffect(() => {
    axios.get('http://localhost:3003/api/runs')
      .then((res) => {
        const all = res.data;
        setRuns(all);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  async function addRun(r) {
    const all_runs = [...runs];

    try {
        const res = await axios.post('/runs', r);
        const new_run = res.data;
        console.log(r, new_run);

        all_runs.push(new_run);
        setRuns(all_runs);
    } catch (err) {
        console.log(err);
    }

}

  return (
    <>
      <div className="mt-6 p-4 max-w-sm mx-auto bg-white rounded-xl shadow-1 flex items-center space-x-4">
        <div className="shrink-0">
          <img className="h-16 w-16" src={runLogo} alt="Running stickman" />
        </div>
        <div className="w-full">
          <div className="flex justify-center text-2xl font-medium text-black">Road to Półmaraton</div>
          <p className="flex justify-center text-slate-500">Bartoszek vs Jasiel</p>
        </div>
      </div>
      {runs? <Chart data={runs} onAdd={addRun}/> : <div className="text-white mt-6 p-4 max-w-sm mx-auto">Loading...</div>}
      {adding ? <NewRun who={chosen}/> :
        (
          <div className="bg-white mx-auto max-w-sm mt-6 rounded-lg p-6 px-12 flex justify-between shadow-1">
            <div className="flex flex-col items-center">
              <button onClick={chooseBartek} className="bg-my-magenta hover:scale-125 duration-300 w-24 h-24 rounded-full flex items-center justify-center">
                <img className="h-16 w-16 text-white" src={plusLogo} alt="Plus sign" />
              </button>
              <p className="text-lg font-mono font-bold">Bartoszek</p>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={chooseJanek} className="bg-my-magenta hover:scale-125 duration-300 w-24 h-24 rounded-full flex items-center justify-center">
                <img className="h-16 w-16 text-white" src={plusLogo} alt="Plus sign" />
              </button>
              <p className="text-lg font-mono font-bold">Jasiel</p>
            </div>
          </div>
        )}
    </>
  );
}

export default App;
