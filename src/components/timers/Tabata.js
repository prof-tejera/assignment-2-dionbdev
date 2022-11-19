import React, {useState, useEffect} from 'react';
import { TimeForm } from '../generic/TimeForm';
import { RestForm } from '../generic/RestForm';
import { startResume, stop, msToTime } from '../generic/commonThings';

const Tabata = (props) => {

    const [workTime, setWorkTime] = useState(3000)
    const [restTime, setRestTime] = useState(3000)
    const [start, setStart] = useState(false)
    const [displayTime, setDisplayTime] = useState('')
    const [displayRestTime, setRestDisplayTime] = useState('')
    const [rounds, setRounds]  = useState(3)
    const [isRestTime, setIsRestTime] = useState(false);
    const [workStart, setWorkStart] = useState(0);
    const [restStart, setRestStart] = useState(0)
    
    const handleTime = (f) => {
      setWorkTime(f)
    }

    const handleWorkStart = (f) => {
      setWorkStart(f)
    }
    const handleRestStart = (f) => {
      setRestStart(f)
    }

    const handleRestTime = (f) => {
      setRestTime(f)
    }
  
    const handleRounds = (f) => {
      setRounds(f)
    }

    const propsTimeConvert = (hours, minutes, seconds) => {
      let millHours = 3600000 * hours ;
      let millMinutes = 60000 * minutes;
      let millSeconds = 1000 * seconds;
      let timeTotal = millHours + millMinutes + millSeconds;
      return timeTotal;
    }

  
    // work time
    useEffect(() => {  
      let timeInterval = null;
      if(start && !isRestTime &&  rounds !== 0 ){
        timeInterval = setInterval(() => {
          setWorkTime(prevTime => prevTime - 10)
          if(workTime === 0){
            
            setIsRestTime(true)
            setRestTime(restStart)
          }
        }, 10)
      } else {
        clearInterval(timeInterval)
      } 
      return () => clearInterval(timeInterval)
    },[start, workTime, isRestTime, restStart, rounds])
  
    // rest time
    useEffect(() => {  
      let restTimeInterval = null;
      if(start && isRestTime &&  rounds !== 0 ){
        restTimeInterval = setInterval(() => {
          setRestTime(prevTime => prevTime - 10)
          if(restTime === 0){
             setRounds(prevRound => prevRound - 1)
             setWorkTime(workStart)
            setIsRestTime(false)
          }
        }, 10)
      } else {
        clearInterval(restTimeInterval)
      } 
      return () => clearInterval(restTimeInterval)
    },[start, restTime, isRestTime, rounds, workStart])

      useEffect(() => {
          if(workTime < -1 ){
            setDisplayTime('00:00')
          } else{
            setDisplayTime( msToTime(workTime)) 
          }
          
      },[workTime])

      useEffect(() => {
        if(restTime < -1 ){
          setRestDisplayTime('00:00')
        } else{
          setRestDisplayTime(msToTime(restTime)) 
        }
        
    },[restTime])

    useEffect(() => {
      if(props?.propsWorkout?.fromAdd) {
        let timeFromHome = propsTimeConvert(props?.propsWorkout?.hours, props?.propsWorkout?.minutes, props?.propsWorkout.seconds);
        let restTimeFromHome = propsTimeConvert(props?.propsWorkout?.hoursRest, props?.propsWorkout?.minutesRest, props?.propsWorkout.secondsRest);
        setWorkTime(timeFromHome)
        setRestTime(restTimeFromHome)
        setRounds(props?.propsWorkout?.rounds)
        
      }
    }, [props?.propsWorkout?.fromAdd, props?.propsWorkout?.rounds, props?.propsWorkout?.hours, props?.propsWorkout?.minutes, props?.propsWorkout?.seconds, props?.propsWorkout?.hoursRest, props?.propsWorkout?.minutesRest, props?.propsWorkout?.secondsRest])
  
      const needForm = props?.propsWorkout?.fromAdd ? false : true;
      return(
        <>
          <h2>{displayTime}</h2>
          <h3>{rounds}</h3>
          <h3>{displayRestTime}</h3>

          { needForm && 
            <>
              <TimeForm 
                handleTime={handleTime} 
                areRounds={true} 
                handleRounds={handleRounds} 
                areWorkStart={true}
                handleWorkStart={handleWorkStart} 
                
              />

              <h3>Rest Form</h3>
              <RestForm 
                handleRestTime={handleRestTime} 
                handleRestStart={handleRestStart}
                />
            </>
          }
          <button onClick={()=> setStart(!start)}>{!start ? startResume : stop}</button>
          <button onClick={() => setWorkTime(0)}>Reset</button>
          <button onClick={() => setRounds(0)}>Fast Foward</button>
        </>
  
      )


};

export default Tabata;
