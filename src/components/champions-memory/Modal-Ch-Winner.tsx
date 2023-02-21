import React from "react";

export default function ModalWinner({ children }: { children: JSX.Element }) {
  return (
    <div id="game-finished">
      {children}
      <div
        id="champion-img"
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/guess-your-champion.appspot.com/o/campeones.jpg?alt=media&token=786dd644-5f4b-44ea-a254-07f022557026")`,
        }}
      ></div>
      <h3>{`You've won the game!`}</h3>
      <h3>{`Our 🐐 would be proud of you`}</h3>
    </div>
  );
}
