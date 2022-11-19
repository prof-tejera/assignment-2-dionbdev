import React, {useState, useEffect} from 'react';
import { TimeForm } from '../generic/TimeForm';
import { startResume, stop, msToTime } from '../generic/commonThings';

const Countdown = (props) => {

  const [time, setTime] = useState(10000)
  const [start, setStart] = useState(false)
  const [displayTime, setDisplayTime] = useState('')
  

  const handleTime = (f) => {
      setTime(f)
  }

  
  useEffect(() => {
    let timeInterval = null;
    if(start && time !== 0){
      timeInterval = setInterval(() => {
        setTime(prevTime => prevTime - 10)
      }, 10)
    } else {
      clearInterval(timeInterval)
    } 
    return () => clearInterval(timeInterval)
  },[start, time])

    useEffect(() => {
       setDisplayTime( msToTime(time) )


    },[time])

    useEffect(() => {
      if(props?.propsWorkout?.fromAdd) {
        let hoursProps = props?.propsWorkout?.hours;
        let minutesProps = props?.propsWorkout?.minutes;
        let secondsProps = props?.propsWorkout?.seconds;
        let timeFromHome = propsTimeConvert(hoursProps, minutesProps, secondsProps);
        setTime(timeFromHome)
        
      }
    }, [props?.propsWorkout?.hours, props?.propsWorkout?.minutes, props?.propsWorkout?.seconds, props?.propsWorkout?.fromAdd])

    const needForm = props?.propsWorkout?.fromAdd ? false : true;

    const propsTimeConvert = (hours, minutes, seconds) => {
      let millHours = 3600000 * hours ;
      let millMinutes = 60000 * minutes;
      let millSeconds = 1000 * seconds;
      let timeTotal = millHours + millMinutes + millSeconds;
      return timeTotal;
    }


    return(
      <>
        <h2>{displayTime}</h2>

        { needForm &&
          <TimeForm handleTime={handleTime} areRounds={false} />
        }
        <button onClick={()=> setStart(!start)}>{!start ? startResume : stop}</button>
        <button onClick={() => setTime(0)}>Reset</button>
        <button onClick={() => setTime(0)}>Fast Foward</button>
      </>

    )
}

export default Countdown;
