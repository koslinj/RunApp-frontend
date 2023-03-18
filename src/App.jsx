import runLogo from "./img/running.svg"
import Chart from "./Chart/Chart";


function App() {


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
      <Chart/>
    </>
  );
}

export default App;
