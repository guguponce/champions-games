import React, { useRef } from "react";
import { players } from "../../utils/utils";

interface iSelectionComponentProps {
  toggleGuessed: React.Dispatch<React.SetStateAction<boolean>>;
  previousPlayers: {
    count: number;
    guessed: number[];
    correct: number[];
    incorrect: number[];
  };
  waitingAnswer: boolean;
  selectionDisplay: string;
  playerSelection: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  nextPlayer: () => void;
}

function SelectionComponent({
  toggleGuessed,
  previousPlayers,
  waitingAnswer,
  playerSelection,
  selectionDisplay,
  nextPlayer,
}: iSelectionComponentProps) {
  function confettiDrop() {
    toggleGuessed(true);
  }

  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div id="selection-box">
      {previousPlayers.count < 11 ? (
        <>
          {" "}
          <select
            className="select-box"
            ref={selectRef}
            disabled={!waitingAnswer}
            onChange={playerSelection}
            value={selectionDisplay}
            id="player-selection"
          >
            <option value={"Select your champion"}>
              -Select your champions-
            </option>
            {players.map((player, i) => (
              <option key={player.dorsal * Math.random()} value={player.name}>
                #{player.dorsal} {player.name}
              </option>
            ))}
          </select>
          <button id="next-player-btn" onClick={nextPlayer}>
            Next Champion
          </button>
        </>
      ): 
      <div id="game-finished-result">
        <h2>{previousPlayers.correct.length} / 26</h2></div>}
    </div>
  );
}

export default SelectionComponent;
