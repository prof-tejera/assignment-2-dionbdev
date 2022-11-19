import { createContext, useState } from "react";

export const AppState = createContext();

const Context = ({ children }) => {
    const [cart, setCart] = useState({blue: 9});
    const [globalCals, setGlobalCal] = useState([])

    const addCalGlobal = (e) => {
        setGlobalCal((globalCals) => [...globalCals, e])
    }
    const handleRemoveClick = (e) => {
        
        setGlobalCal((globalCals) => 
           globalCals.filter((f) => (
            f.id !== e.target.id)) 
        )
    }
    

    return <AppState.Provider value={{ cart, setCart, globalCals, setGlobalCal, addCalGlobal, handleRemoveClick}}>{children}</AppState.Provider>
}

export default Context;