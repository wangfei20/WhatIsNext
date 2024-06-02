import React, { useEffect, useState } from "react";

function Countdown() {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const eventTime = new Date("May 12, 2024 12:00:00"); 
  
    const intervalRef = setInterval(() => {
        let timeDiff = eventTime - new Date();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        timeDiff %= (1000 * 60 * 60 * 24);
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        timeDiff %= (1000 * 60 * 60);
        const minutes = Math.floor(timeDiff / (1000 * 60));
        timeDiff %= (1000 * 60);
        const seconds = Math.floor(timeDiff / 1000);
  
        setRemainingTime(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`);
      }, 500);

    return () => {
        clearInterval(intervalRef);
      };
  }, []);


  return (
    <div class="countdown-container">
        <h1>Launch of Freact</h1>  
        <h3>Time Remaining:</h3>
        <div class="countdown-text">{remainingTime}</div>
    </div>
  );
}

export default Countdown;
