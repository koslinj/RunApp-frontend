import React, { useState } from 'react'
import arrowUp from "../img/arrow_up.svg"
import arrowDown from "../img/arrow_down.svg"

function NewRun(props) {

    const [kilometers, setKilometers] = useState(10)

    const addExercise = () => {

        const run = {
            title: kilometers,
        }
        props.onAdd(run);
    }

    return (
        <div className="bg-white max-w-sm mx-auto mt-6 p-4 flex justify-between items-center">
            <p className='text-3xl font-mono font-bold'>{props.who}</p>
            <div className='flex items-center'>
                <p>Odległość:</p>
                <div className='mx-4 text-2xl w-6'>{kilometers}</div>
                <div>
                    <img className='w-8 h-8 hover:scale-125' src={arrowUp} onClick={() => setKilometers(kilometers + 1)} ></img>
                    <img className='w-8 h-8 hover:scale-125' src={arrowDown} onClick={() => setKilometers(kilometers - 1)} ></img>
                </div>
            </div>
            <div>
                <p>Czas</p>
            </div>
            {/* <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={props.hide}>Wróć</button>
            <button onClick={addExercise} className="save-btn">Zapisz</button> */}
        </div>
    )
}

export default NewRun