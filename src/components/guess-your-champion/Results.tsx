import { players } from "../../utils/utils";
import { useEffect } from "react";
export default function Results<iPreviousPlayers>(props: {
  previousPlayers: {
    count: number;
    guessed: number[];
    correct: number[];
    incorrect: number[];
  };
}) {
  useEffect(() => {}, [props]);

  return (
    <div id="results-box">
      <h2 id="results-title">Results</h2>

      <div className="correct-incorrect-container">
        <h4 className="correct-incorrect-title">Incorrects</h4>
        <ul>
          {props.previousPlayers.incorrect.map((dorsal: number) => (
            <li key={dorsal * Math.random()}>
              <span>#{dorsal}</span> - <span>{players[dorsal - 1].name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="correct-incorrect-container">
        <h4 className="correct-incorrect-title">Corrects</h4>
        <ul>
          {props.previousPlayers.correct.map((dorsal: number) => (
            <li key={dorsal * Math.random()}>
              <span>#{dorsal}</span> - <span>{players[dorsal - 1].name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
