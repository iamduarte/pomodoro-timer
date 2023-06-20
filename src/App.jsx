import React, { useEffect } from 'react'
import './App.css'

function App() {
  const [sessionTime, setSessionTime] = React.useState(25)
  const [breakTime, setBreakTime] = React.useState(5)
  const [timeLeft, setTimeLeft] = React.useState(1500)
  const [isActive, setIsActive] = React.useState(false)
  const [isSession, setIsSession] = React.useState(true)

  React.useEffect(() => {
    let intervalID

    if(isActive && timeLeft > 0){
      intervalID = setInterval(() => {
        setTimeLeft(prevTime => prevTime -  1)
      }, 1000);//----------------------------------------> CLOCK SPEED
    } else if (isActive && timeLeft === 0){
        setTimeout(() => {
          const audio = document.getElementById('beep');
          audio.play();
          if (isSession) {
            setIsSession(false)
            setTimeLeft(breakTime * 60)
          } else {
            setIsSession(true)
            setTimeLeft(sessionTime * 60)
          }
        }, 1000)
    }
    return () => clearInterval(intervalID)

  } , [isActive, timeLeft, isSession, sessionTime, breakTime])

  function displayTime(time){
    const minutes = Math.floor(time/60).toString().padStart(2, '0')
    const seconds = (time%60).toString().padStart(2, '0')
  
    return `${minutes}:${seconds}`
  }

  function handleStart(){
    setIsActive(prevState => !prevState)
  }

  function handleReset(){
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;

    setIsActive(false)
    setBreakTime(5)
    setSessionTime(25)
    setTimeLeft(1500)
    setIsSession(true)
  }

  function handleSetter(op, id){
    if(!isActive){
        if(id === "session"){
          if(op === "+"){
            setSessionTime(prevTime => Math.min(prevTime + 1, 60))
            setTimeLeft(prevTime => Math.min(prevTime + 60, 3600))
          } else{
            setSessionTime(prevTime => Math.max(prevTime - 1, 1))
            setTimeLeft(prevTime => Math.max(prevTime - 60, 60))
          }
      } else{
          if(op === "+"){
            setBreakTime(prevTime => Math.min(prevTime + 1, 60))
          } else{
            setBreakTime(prevTime => Math.max(prevTime - 1, 1))
          }
      }
    }
  }

  return (
  <>
    <div className='title-label'>Pomodoro Timer</div>
    <div className='main-container'>
      <div className='setter-label' id="session-label">
        <p className='label-text' >Set Session</p>
        <div className="setter-length" id="session-length">{sessionTime}</div>
        <div className="setter-btn setter-element" id="session-decrement" onClick={() => handleSetter("-", "session")}>-</div>
        <div className="setter-btn setter-element" id="session-increment" onClick={() => handleSetter("+", "session")}>+</div>
      </div>
      <div className='setter-label' id="break-label">
        <p className='label-text' >Set Break</p>
        <div className="setter-length" id="break-length">{breakTime}</div>
        <div className="setter-btn setter-element" id="break-decrement" onClick={() => handleSetter("-", "break")}>-</div>
        <div className="setter-btn setter-element" id="break-increment" onClick={() => handleSetter("+", "break")}>+</div>
      </div>
      <div id="timer-label">
        <p className='label-text' >{isSession ? "Session" : "Break"}</p>
        <div id="time-left">{displayTime(timeLeft)}</div>
        <div className='timer-btn' id="start_stop" onClick={handleStart}>{isActive ? "Pause" : "Start"}</div>
        <div className='timer-btn' id="reset" onClick={handleReset}>Reset</div>
      </div>
    </div>
    <div className='footer-label'><p>This is part of the <a href='https://www.freecodecamp.org/' target="_blank">FreeCodeCamp</a> frontend certification.</p></div>
    <audio id="beep" src="https://www.orangefreesounds.com/wp-content/uploads/2018/06/Cool-alarm-tone-notification-sound.mp3" />
  </>
  )
  }

export default App
