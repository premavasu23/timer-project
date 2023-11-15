import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [isCountingDown, setIsCountingDown] = useState(false);
  const defaultDate = new Date('2023-10-06T00:00:00');
  const [date, setDate] = useState(defaultDate)
  const [displayTime, setDisplayTime] = useState('00:00');

  const addTime = ((event) => {
    const buttonId = event.target.id;

    if(buttonId === 'add1Min') {
      date.setMinutes(date.getMinutes() + 1);
    }
    else if (buttonId === 'add10Sec') {
      date.setSeconds(date.getSeconds() + 10);
    }
    else if (buttonId === 'add1Sec') {
      date.setSeconds(date.getSeconds() + 1);
    }

    setDate(date)  
    setDisplayTime(String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0"))

  })
  
  const resetTimer = (() => {
    setDate(defaultDate);
    setDisplayTime("00:00");
  })


// This useEffect triggers every second and counts down the timer IF we are in a counting down state
  useEffect(() => {
    const seconds = setInterval(() => {
   
        if(isCountingDown === true){
          date.setSeconds(date.getSeconds() - 1);
          setDate(date)
          setDisplayTime(String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0"))
        }
    
    }, 1000);
    return () => clearInterval(seconds);
  }, [date, isCountingDown]);

  useEffect(() => {
    if (displayTime === "00:00") {
      setIsCountingDown(false);
      // TODO: add animation?
      resetTimer();
    }
  }, [displayTime])



  const updateIfCountingDown = (() => {
    if (isCountingDown === false) {
      // ensure we don't count down from 00:00 --> 59:59
      if(displayTime !== "00:00") {
        setIsCountingDown(true);
      }
    } else {
      setIsCountingDown(false)
    }
  })

  return (
    <div className="App">
      <p className="time-display">{displayTime}</p>

      <div>
      <button className="major-button" onClick={updateIfCountingDown}>Start/Stop</button>
      <button className="major-button" onClick={resetTimer}>Reset</button>
      </div>

      <div>
      <button className="minor-button" id="add1Min" onClick={addTime}>+ 1 min</button>
      <button className="minor-button" id="add1Sec" onClick={addTime}>+ 1 sec</button>
      <button className="minor-button" id="add10Sec" onClick={addTime}>+ 10 sec</button>
      </div>
    </div>
  );
}

export default App;
