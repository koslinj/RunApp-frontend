import React, { useState } from 'react'
import arrowUp from "../img/arrow_up.svg"
import arrowDown from "../img/arrow_down.svg"
import arrowBack from "../img/back.svg"
import accept from "../img/accept.svg"

function NewRun(props) {

    const [kilometers, setKilometers] = useState(10)
    const [seconds, setSeconds] = useState(360)

    const addRun = () => {

        const run = {
            kilometers: kilometers,
            name: props.who,
            paceInSeconds: seconds
        }
        props.onAdd(run);
    }

    return (
        <div className="bg-white h-52 max-w-lg mx-auto my-6 p-3 flex flex-col items-center rounded-xl shadow-1">
            <div className='w-full flex justify-between'>
                <button onClick={props.hide}>
                    <img className='w-10 h-10 hover:scale-125 duration-300 mb-4' src={arrowBack} alt="arrow back" />
                </button>
                <p className='text-4xl font-mono font-bold'>{props.who}</p>
                <button onClick={addRun} className="save-btn">
                    <img className='w-10 h-10 hover:scale-125 duration-300 mb-4' src={accept} alt="accept" />
                </button>
            </div>
            <div className='w-full flex flex-row justify-around flex-wrap'>
                <div className='flex items-center'>
                    <p className='text-2xl mr-2'>Odległość:</p>
                    <div className='flex flex-col items-center justify-center'>
                        <img className='w-12 h-12 active:scale-125 duration-200' src={arrowUp} alt="arrow up" onClick={() => setKilometers(kilometers + 1)} ></img>
                        <div className='text-2xl'>{kilometers}</div>
                        <img className='w-12 h-12 active:scale-125 duration-200' src={arrowDown} alt="arrow down" onClick={() => setKilometers(kilometers - 1)} ></img>
                    </div>
                </div>
                <div className='flex items-center ml-8'>
                    <p className='text-2xl mr-2'>Czas:</p>
                    <div className='flex flex-col items-center justify-center'>
                        <img className='w-12 h-12 active:scale-150 duration-200' src={arrowUp} alt="arrow up" onClick={() => setSeconds(seconds + 60)} ></img>
                        <div className='text-2xl'>{Math.floor(seconds / 60)}</div>
                        <img className='w-12 h-12 active:scale-150 duration-200' src={arrowDown} alt="arrow down" onClick={() => setSeconds(seconds - 60)} ></img>
                    </div>
                    <div className='flex flex-col items-center justify-center ml-8'>
                        <img className='w-12 h-12 active:scale-150 duration-200' src={arrowUp} alt="arrow up" onClick={() => setSeconds(seconds + 5)} ></img>
                        <div className='text-2xl'>{seconds % 60}</div>
                        <img className='w-12 h-12 active:scale-150 duration-200' src={arrowDown} alt="arrow down" onClick={() => setSeconds(seconds - 5)} ></img>
                    </div>
                    <div className='flex h-4/5 flex-col items-center justify-between ml-2'>
                        <div onClick={() => setSeconds(seconds + 1)} className=' active:scale-125 duration-200 flex justify-center items-center border-black border-2 rounded-xl p-1'>
                            <img className='w-8 h-8' src={arrowUp} alt="arrow up"></img>
                            <p>+1</p>
                        </div>
                        <div onClick={() => setSeconds(seconds - 1)} className=' active:scale-125 duration-200 flex justify-center items-center border-black border-2 rounded-xl p-1'>
                        <img className='w-8 h-8' src={arrowDown} alt="arrow down"></img>
                            <p>-1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRun