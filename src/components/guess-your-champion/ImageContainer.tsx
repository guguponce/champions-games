import { players } from "../../utils/utils";

interface iImageContainerProps {
  waitingAnswer: boolean;
  currentPlayer: number;
  previousPlayers: {
    count: number;
    guessed: number[];
    correct: number[];
    incorrect: number[];
  };
  guessed: boolean;
}

export default function ImageContainer({
  waitingAnswer,
  currentPlayer,
  previousPlayers,
  guessed,
}: iImageContainerProps) {
  return (
    <div id="img-container">
      <h2 id="img-name">
        {!waitingAnswer ?
          `World Champion: ${
            players[currentPlayer].name !== "Lionel Messi"
              ? players[currentPlayer].name
              : "GOAT 🐐"
          }` : ""}
      </h2>
      <div
        id="champion-img"
        style={{
          backgroundImage: `url("${
            previousPlayers.count > 10
              ? "https://firebasestorage.googleapis.com/v0/b/guess-your-champion.appspot.com/o/campeones.jpg?alt=media&token=786dd644-5f4b-44ea-a254-07f022557026"
              : waitingAnswer
              ? players[currentPlayer].imgQuest
              : players[currentPlayer].imgAns
          }")`,
        }}
      />
      <h2 id="correct-text">
        {waitingAnswer ? "" : guessed ? "Correct!" : "Incorrect!"}
      </h2>
    </div>
  );
}
