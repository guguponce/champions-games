import React, { useState, useEffect } from "react";

export default function Timer({
  timeLeft,
  setTimeLeft,
  toggleTimeRuns,
  timeRuns,
}: {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  toggleTimeRuns: React.Dispatch<React.SetStateAction<boolean>>;
  timeRuns: boolean;
}): JSX.Element {
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRuns) {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }
    }, 1000);

    if (timeLeft === 0) {
      toggleTimeRuns(false)
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeLeft, timeRuns]);

  return (
    <div>
      {timeLeft > 0 ? (
        <h2 id="time-left"><span>Time left:</span> <span>{timeLeft}</span></h2>
      ) : (
        <h2 id="time-left">Time is up!</h2>
      )}
    </div>
  );
}
