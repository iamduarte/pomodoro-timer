import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import alarm from "./assets/alarm.mp3"

function App() {
  //State timer
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(25);
  //State Session
  const [session, setSession] = React.useState(25);
  //State Break, Dur added because break is a JS keyword
  const [breakDur, setBreakDur] = React.useState(5);
  //Aux States
  const [isPaused, setIsPaused] = React.useState(false);
  const [isStarted, setIsStarted] = React.useState(false);
  const [isSession, setIsSession] = React.useState(true);
  const audio = new Audio(alarm)

  React.useEffect(() => {
    let intervalId;

    if(seconds === 0 && minutes === 0 && isSession === true){
      playSound()
      setMinutes(breakDur)
      setIsSession(false)
    } else if(seconds === 0 && minutes === 0 && isSession === false){
      playSound()
      setMinutes(session)
      setIsSession(true)
    }

    if (isStarted && !isPaused) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);//                    TIMER SPEED
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [minutes, seconds, isPaused, isStarted]);

  function showTimer(){
    if(seconds >= 10 && minutes >= 10){
      return <h1>{minutes}:{seconds}</h1>
    } else if(seconds <= 10 && minutes >= 10){
      return <h1>{minutes}:0{seconds}</h1>
    } else if(seconds >= 10 && minutes <= 10){
      return <h1>0{minutes}:{seconds}</h1>
    }else if(seconds <= 10 && minutes <= 10){
      return <h1>0{minutes}:0{seconds}</h1>
    }
  }

  function handleReset(){
    resetSound()
    setIsStarted(false)
    setMinutes(25)
    setSeconds(0)
    setBreakDur(5)
    setSession(25)

  }

  function handleStartPause(){
    if(!isStarted){
      setIsStarted(true)
      setIsPaused(false)
    } else{
      setIsPaused(!isPaused)
    }
  }

  function handleSetter (op, id) {
    if(op === "+"){
      if(id === "breakDur"){
        breakDur < 60 && setBreakDur(prevBreakDur  => prevBreakDur + 1)
      } else if(session < 60){
        setSession(prevSession => prevSession + 1)
        setMinutes(prevMinutes => prevMinutes + 1)
      }

    } else {
      if(id === "breakDur"){
        breakDur > 1 && setBreakDur(prevBreakDur  => prevBreakDur - 1)
      } else if(session > 1){
        setSession(prevSession => prevSession - 1)
        setMinutes(prevMinutes => prevMinutes - 1)
      }

    }
  }

  function playSound(){
    audio.play()
  }

  function resetSound(){
    audio.pause();
    audio.currentTime = 0
    console.log("sound reset")
  }

  return (
    <>
      <div id="timer-label">
        <div className="setter-label" id="break-label">
          Break Lenght
          <div className='setter-btn' id="break-decrement" onClick={() => handleSetter("-", "breakDur")}>-</div>
          <div id="break-length">{breakDur}</div>
          <div className='setter-btn' id="break-increment" onClick={() => handleSetter("+", "breakDur")}>+</div>
        </div>
        <div className="setter-label" id="session-label">
          Session Length
          <div className='setter-btn' id="session-decrement" onClick={() => handleSetter("-", "session")}>-</div>
          <div id="session-length">{session}</div>
          <div className='setter-btn' id="session-increment" onClick={() => handleSetter("+", "session")}>+</div>
        </div>
        <div className="setter-label" id="time-left">
          {showTimer()}
        </div>
        <h1>{isSession ? "Session Started" : "Break Started"}</h1>
        <button id="start_stop" onClick={handleStartPause}>{isStarted && !isPaused ? "Pause" : isStarted ? "Resume" : "Start"}</button>
        <button id="reset" onClick={handleReset}>reset</button>
      </div>
    </>
  )
  }

export default App
