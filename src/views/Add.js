import React, { useState, useContext } from "react";
import uuid from 'react-uuid';

import { AppState } from "../context/Context";
import { handleChangeState } from "../components/generic/commonThings";

const Add = () => {
    
    const [pickedCal, setPickedCal] = useState('stopwatch');
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [rounds, setRounds] = useState(0);
    const [secondsRest, setSecondsRest] = useState(0);
    const [minutesRest, setMinutesRest] = useState(0);
    const [hoursRest, setHoursRest] = useState(0);
    
    const {  globalCals, addCalGlobal, handleRemoveClick } = useContext(AppState);
    
    const submitAddWorkoutCal = (e) => {
        e.preventDefault()
        let calAdded = {pickedCal, hours, minutes, seconds, rounds, secondsRest, minutesRest, hoursRest, id: uuid(), fromAdd: true }
        
        addCalGlobal(calAdded)
    }
    
    let showTabataForm = pickedCal === 'tabata' ? true : false;
    
    
    const handlePickedChange = (e) => {
        setPickedCal(e.target.value)
    }

return (    
        <>
            <form onSubmit={submitAddWorkoutCal}>
                <select value={pickedCal} onChange={handlePickedChange}>
                    <option value="stopwatch">StopWatch</option>
                    <option value="countdown">Countdown</option>
                    <option value="xy">XY</option>
                    <option value="tabata">Tabata</option>
                </select>
                <label>Hours</label>
                <input
                    type="number"
                    aria-label="Hours"
                    min="0" 
                    max="5"
                    placeholder="Hours"
                    value={hours}
                    onChange={(event) => handleChangeState(event, setHours)}
                />
                <label>Minutes</label>
                <input
                    type="number"
                    aria-label="Minutes"
                    min="0" 
                    max="59"
                    placeholder="Minutes"
                    value={minutes}
                    onChange={(event) => handleChangeState(event, setMinutes)}
                />
                <label>Seconds</label>
                <input
                    type="number"
                    aria-label="Seconds"
                    min="0" 
                    max= "59"
                    placeholder="Seconds"
                    value={seconds}
                    onChange={(event) => handleChangeState(event, setSeconds)}
                />
                <label>Rounds</label>
                <input
                    type="number"
                    aria-label="Rounds"
                    min="0" 
                    max= "59"
                    placeholder="Rounds"
                    value={rounds}
                    onChange={(event) => handleChangeState(event, setRounds)}
                />

            
                    { showTabataForm && 
                        <>
                            <br/>
                            
                            <label>Hours</label>
                            <input
                                type="number"
                                aria-label="Hours"
                                min="0" 
                                max="5"
                                placeholder="Hours"
                                value={hoursRest}
                                onChange={(event) => handleChangeState(event, setHoursRest)}
                            />
                            <label>Minutes</label>
                            <input
                                type="number"
                                aria-label="Minutes"
                                min="0" 
                                max="59"
                                placeholder="Minutes"
                                value={minutesRest}
                                onChange={(event) => handleChangeState(event, setMinutesRest)}
                            />
                            <label>Seconds</label>
                            <input
                                type="number"
                                aria-label="Seconds"
                                min="0" 
                                max= "59"
                                placeholder="Seconds"
                                value={secondsRest}
                                onChange={(event) => handleChangeState(event, setSecondsRest)}
                            />
                        </>
                    }
                <input type="submit" value="Add Calc" />
            </form>
            <ul style={{listStyleType: 'none'}}>
                { globalCals && globalCals.map((x) => (
                <li key={x.id}>
                    <h3>Calculator</h3>
                    {x.pickedCal.toUpperCase()}
                    <br/>
                    { x.pickedCal !== 'stopwatch' ? <h4 style={{display:"inline", marginRight: 5, marginLeft: 5}}>Hours</h4> : ''}
                    { x.pickedCal !== 'stopwatch' ? x.hours : ''}
                    { x.pickedCal !== 'stopwatch' ? <h4 style={{display:"inline", marginRight: 5, marginLeft: 5}}>Minutes</h4> : ''}
                        { x.pickedCal !== 'stopwatch' ? x.minutes : ''}
                    { x.pickedCal !== 'stopwatch' ? <h4 style={{display:"inline", marginRight: 5, marginLeft: 5}}>Seconds</h4> : ''}
                        { x.pickedCal !== 'stopwatch' ? x.seconds : ''}
                    { x.pickedCal !== 'stopwatch' ? <h4 style={{display:"inline", marginRight: 5, marginLeft: 5}}>Rounds</h4> : ''}
                    { x.pickedCal !== 'stopwatch'&& 'countdown' ? x.rounds : ''}
                     {x.picked !== 'stopwatch' ? <br /> : ''}   
                     {x.pickedCal === 'tabata' ? <h3>Rest Time</h3> : '' } 
                     {x.pickedCal === 'tabata' ? <h4 style={{display:"inline", marginRight: 5, marginLeft: 5}}>Rest Hours</h4> : '' }   
                     {x.pickedCal === 'tabata' ? x.hoursRest : '' } 
                     {x.pickedCal === 'tabata' ? <h4 style={{display:"inline", marginRight: 5, marginLeft: 5}}>Rest Minutes</h4> : '' } 
                     {x.pickedCal === 'tabata' ?    x.minutesRest : '' } 
                     {x.pickedCal === 'tabata' ? <h4 style={{display:"inline", marginRight: 5, marginLeft: 5}}>Rest Seconds</h4> : '' } 
                     {x.pickedCal === 'tabata' ? x.secondsRest : '' }   
                    <button
                        aria-label="Remove workout"
                        id={x.id}
                        onClick={handleRemoveClick}>
                            &times;
                    </button>
                </li>
                ) )}
            </ul>
        </>
    )
}

export default Add;
