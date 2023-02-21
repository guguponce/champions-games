import React from "react";

export default function GameOver({ level }: { level: number }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <h3>{`You've made it until level ${level}`}!</h3>
    </div>
  );
}
