import { useEffect, useRef, useState } from "react";
import { players } from "../utils/utils";
import Confeti from "./Confeti";
import Results from "./guess-your-champion/Results";
import ImageContainer from "./guess-your-champion/ImageContainer";
import SelectionComponent from "./guess-your-champion/SelectionComponent";
import Title from "./Title";
import Header from "./Header";
import Modal from "./Modal";

interface iPreviousPlayers {
  count: number;
  guessed: number[];
  correct: number[];
  incorrect: number[];
}
function GuessYourChampion() {
  const [currentPlayer, setCurrentPlayer] = useState(
    Math.floor(Math.random() * 26)
  );
  const [waitingAnswer, setWaitingAnswer] = useState(true);
  const [guessed, toggleGuessed] = useState(false);
  const [previousPlayers, setPreviousPLayers] = useState<iPreviousPlayers>({
    count: 1,
    guessed: [players[currentPlayer].dorsal],
    correct: [],
    incorrect: [],
  });
  const [recycle, toggleRecycle] = useState(false);
  const [selectionDisplay, setSelectionDisplay] = useState(
    "-Select your champion-"
  );
  const selectRef = useRef<HTMLSelectElement>(null);
  const [modalOn, toggleModalOn] = useState(true);
  const [gameFinished, toggleGameFinished] = useState(false);

  useEffect(() => {
    if (previousPlayers.count === 10) {
      let ls = localStorage.getItem("gamesPlayed");
      ls
        ? localStorage.setItem(
            "gamesPlayed",
            JSON.stringify({
              ...JSON.parse(ls),
              guessChampion: { gameFinished: { gameFinished: "true" } },
            })
          )
        : localStorage.setItem(
            "gamesPlayed",
            JSON.stringify({ guessChampion: { gameFinished: "true" } })
          );
    }
  }, [gameFinished]);
  useEffect(() => {
    if (previousPlayers.correct.length > 0) {
      let ls = localStorage.getItem("gamesPlayed");
      if (!!ls) {
        const lsGuess = JSON.parse(ls).guessChampion;
        const newResult = !lsGuess
          ? { guessChampion: { bestResult: previousPlayers.correct.length } }
          : lsGuess.bestResult < previousPlayers.correct.length
          ? { guessChampion: { bestResult: previousPlayers.correct.length } }
          : { guessChampion: { ...lsGuess } };
        localStorage.setItem(
          "gamesPlayed",
          JSON.stringify({
            ...JSON.parse(ls),
            ...newResult,
          })
        );
      } else {
        localStorage.setItem(
          "gamesPlayed",
          JSON.stringify({
            guessChampion: { bestResult: previousPlayers.correct.length },
          })
        );
      }
    }
  }, [previousPlayers]);

  function confettiDrop() {
    toggleGuessed(true);
  }

  function nextPlayer() {
    toggleGuessed(false);

    let newNum = Math.floor(Math.random() * 26);
    if (previousPlayers.count === 10) {
      setPreviousPLayers((prev) => ({
        ...prev,
        count: prev.count + 1,
      }));
      if (selectionDisplay === "-Select your champion-") {
        setPreviousPLayers((prev) => ({
          ...prev,
          incorrect: [...prev.incorrect, players[currentPlayer].dorsal],
        }));
      }
      toggleRecycle(true);
      setTimeout(() => {
        toggleRecycle(false);
      }, 3000);
      confettiDrop();
      setTimeout(() => {
        toggleGameFinished(true);
        previousPlayers.count = 0;
      }, 8000);
      return;
    } else if (previousPlayers.guessed.indexOf(newNum) === -1) {
      setPreviousPLayers((prev) => ({
        ...prev,
        count: prev.count + 1,
        guessed: [...prev.guessed, newNum],
      }));
      if (selectionDisplay === "-Select your champion-") {
        setPreviousPLayers((prev) => ({
          ...prev,
          incorrect: [...prev.incorrect, players[currentPlayer].dorsal],
        }));
      }
      setCurrentPlayer(newNum);
      setWaitingAnswer(true);
      setSelectionDisplay("-Select your champion-");
    } else {
      nextPlayer();
    }
  }

  function playerSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    window.scrollTo(0, 0);
    setWaitingAnswer(false);
    setSelectionDisplay(e.target.value);
    if (e.target.value === players[currentPlayer].name) {
      setPreviousPLayers((prev) => ({
        ...prev,
        correct: [...prev.correct, players[currentPlayer].dorsal],
      }));
      confettiDrop();
    } else {
      setPreviousPLayers((prev) => {
        return {
          ...prev,
          incorrect: [...prev.incorrect, players[currentPlayer].dorsal],
        };
      });
    }
  }

  const startGame = () => {
    setCurrentPlayer(Math.floor(Math.random() * 26));
    setWaitingAnswer(true);
    toggleGuessed(false);
    setPreviousPLayers({
      count: 1,
      guessed: [players[currentPlayer].dorsal],
      correct: [],
      incorrect: [],
    });
  };

  return (
    <div id="GuessYourChampion">
      {guessed && <Confeti recycle={recycle} />}

      {modalOn && (
        <Modal toggleModalOn={toggleModalOn} buttonText="Start the game!">
          <div>
            <h3>Instructions</h3>
            <ul>
              <li>You gotta guess which player is hidding</li>
              <li>10 of the champions will be displayed</li>
            </ul>
            <h4>Go! Try it out! I'm sure you'll lose</h4>
          </div>
        </Modal>
      )}
      {gameFinished && (
        <Modal
          toggleModalOn={toggleModalOn}
          buttonText="Play again?"
          modalButtonFunction={() => {
            startGame();

            toggleGameFinished(false);
          }}
        >
          {previousPlayers.correct.length === 10 ? (
            <div id="game-finished">
              <h2>Incredible!</h2>
              <h3>Are you sure you ain't any of those champions?</h3>
              <h3>You guessed everyone of them!</h3>
            </div>
          ) : (
            <div>
              <h2>
                {previousPlayers.correct.length > 7
                  ? "Very well done!"
                  : previousPlayers.correct.length > 4
                  ? "Well done"
                  : previousPlayers.correct.length > 3
                  ? "Good job!"
                  : "Better get some practice"}
              </h2>
              <h3>
                {previousPlayers.correct.length > 7
                  ? "You almost got them all!"
                  : previousPlayers.correct.length > 4
                  ? "You'll have better luck next time"
                  : "That's what our 🐐 would do"}
              </h3>
              <h3>You typed {previousPlayers.correct.length}/26 champions</h3>
            </div>
          )}
        </Modal>
      )}
      <Header>
        <Title title="Can you guess the hidden World champions?" />
      </Header>
      <main id="guess-your-champion-container">
        <Results previousPlayers={previousPlayers} />
        <ImageContainer
          waitingAnswer={waitingAnswer}
          currentPlayer={currentPlayer}
          previousPlayers={previousPlayers}
          guessed={guessed}
        />
        <SelectionComponent
          toggleGuessed={toggleGuessed}
          previousPlayers={previousPlayers}
          waitingAnswer={waitingAnswer}
          playerSelection={playerSelection}
          selectionDisplay={selectionDisplay}
          nextPlayer={nextPlayer}
        />
      </main>
    </div>
  );
}

export default GuessYourChampion;
