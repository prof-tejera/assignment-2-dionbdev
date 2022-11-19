import React, { useContext } from "react";
import { AppState } from '../context/Context'
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";

const Home = () => {

  const {  globalCals } = useContext(AppState);
  
  const arrMap = (propsWorkout) => {
    switch (propsWorkout.pickedCal) {
      case "xy":
        return <XY key={propsWorkout.id} propsWorkout={propsWorkout} />;
       
      case "tabata":
        return <Tabata key={propsWorkout.id} propsWorkout={propsWorkout} />;
       
      case "countdown":
        return <Countdown key={propsWorkout.id} propsWorkout={propsWorkout} />
        
      case "stopwatch":
        return <Stopwatch key={propsWorkout.id} propsWorkout={propsWorkout} />;
       
      default:
        return ;
    }
  }

  
  return (
    <>
        <h1>Home</h1>
        {globalCals.map(y => arrMap(y))} 
        
    </>
  );
};

export default Home;
