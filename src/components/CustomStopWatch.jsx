import React, { useState, useEffect, useRef } from "react";

export default function CustomStopWatch(props) {

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;

    let time = props.time;
    // const startTimeRef = useRef(0);
    // const [time, setTime] = useState(0);
    // const [isRunning, setIsRunning] = useState(false);
    
    // useEffect(() => {
    //     let intervalId;
    //     if (isRunning) {
    //     intervalId = setInterval(() => setTime(Date.now() - startTimeRef.current), 1);
    //     }
    //     return () => clearInterval(intervalId);
    // }, [isRunning]);
    
    const hours = Math.floor(time / HOUR);
    const minutes = Math.floor((time / MINUTE) % 60);
    const seconds = Math.floor((time / SECOND) % 60);
    const milliseconds = time % SECOND;
    
    const start = () => {
        startTimeRef.current = Date.now();
        setIsRunning(true);
    };
    
    const stop = () => {
        setIsRunning(false);
    };
    
    const reset = () => {
        stop();
        setTime(0);
    };
    
    return (
        <div className="stp-watch">
            <div style={{ 
                fontFamily: "Inconsolata", 
                fontSize: "2rem",
            }}
            >
                {/* {hours}: */}
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(3, "0")}
            </div>
        </div>
    );
}