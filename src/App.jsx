import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import CustomStopWatch from './components/CustomStopWatch'
import React from 'react'


function App() {

  const [dice, setDice] = useState(() => generateDice())
  const [gameStarted, setGameStarted] = useState(false)
  const rollBtn = useRef(null)
  
  /* stopwatch */
  const startTimeRef = useRef(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const gameWon = dice.every(die => die.isHeld && die.value == dice[0].value)

  useEffect(() => {
    rollBtn.current.focus();
    setIsRunning(false);
  }, [gameWon])


  function generateDice() {
    return new Array(10)
    .fill(0)
    .map(() => ({ 
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    )
  }
  
  const diceComponents = dice.map(dieObj => 
    <Die 
      key={dieObj.id} 
      id={dieObj.id} 
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ) 

  function hold(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? 
        {...die, isHeld: !die.isHeld} : die
      )
    )
  }

  function rollDice() {
    if(gameWon) {
      setDice(generateDice())
      setTime(0)
      setGameStarted(false)
      rollBtn.current.classList.add('invisible')

    }
    else setDice(prevDice => prevDice.map(
      die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    ))
  }

  function MyConfetti() {
    const { width, height } = useWindowSize()
    return (
      <Confetti
        width={width}
        height={height}
      />
    )
  }

  function reclaimDice() {
    setDice(prevDice => prevDice.map(die => {
      return {...die, isHeld: false}
    }))
  }

  useEffect(() => {
    let intervalId;
    if (isRunning) {
    intervalId = setInterval(() => setTime(Date.now() - startTimeRef.current), 1);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);
  
  function handleGameStart() {
    setGameStarted(true)
    startTimeRef.current = Date.now();
    setIsRunning(true);
    rollBtn.current.classList.remove('invisible')
    setDice(generateDice())
  }
  
  function restartGame() {
    
    reclaimDice()
    setGameStarted(false)
    setIsRunning(false)
    setTime(0)
    rollBtn.current.classList.add('invisible')

  }

  return (
    <main>
      <CustomStopWatch 
        time = {time}
      />

      <div className="main-container">

      
        {gameWon && <MyConfetti />}
        <div className="headings">
          <h1>Tenzies</h1>
          <h4>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
        </div>
        <div className="dice-container">
          {diceComponents}
        </div>
        <div className="btn-container">
          {!gameStarted && ( 
            <button className="roll-btn center-btn" onClick={handleGameStart}>Start Game</button>
          )}
          
          {gameStarted && !gameWon && <button className="reset-btn" onClick={reclaimDice}>Reclaim</button>}
          <button ref={rollBtn} className="roll-btn invisible center-btn" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
          {gameStarted && !gameWon && <button className="reset-btn" onClick={restartGame}>Restart</button>}
        </div>

      </div>
    </main>
  )
}

export default App
