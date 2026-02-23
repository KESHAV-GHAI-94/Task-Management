import React from "react";
import {createContext,useState} from "react";

export const TaskContext = createContext();

export const TaskProvider =({children})=>{
    const [Tasks,setTasks]= useState(null);

    return(
        <TaskContext.Provider value={{Tasks,setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}
export default TaskContext;