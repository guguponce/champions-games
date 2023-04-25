import React, { useRef, useEffect, useState } from "react";
import { players } from "../utils/utils";
import Modal from "./Modal";
import Header from "./Header";
import Title from "./Title";
import ModalStart from "./type-all-champions/Modal-T-Start";
import Timer from "./type-all-champions/Timer";

export default function TypeAllChampions() {
  const sortedNames = useRef(["Messi"]);
  const currentIndex = useRef<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [typedPlayers, setTypedPlayers] = useState<string[]>([]);
  const [modalOn, toggleModalOn] = useState(true);
  const [timeRuns, toggleTimeRuns] = useState(false);
  const [gameFinished, toggleGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timeLeft === 0) {
      toggleTimeRuns(false);
      toggleGameFinished(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (
      inputValue === sortedNames.current[currentIndex.current].toUpperCase()
    ) {
      setTypedPlayers((prev) => [...prev, inputValue]);
      setInputValue("");
      if (currentIndex.current < 25) {
        currentIndex.current++;
      }
    }
  }, [inputValue]);

  useEffect(() => {
    if (typedPlayers.length === sortedNames.current.length) {
      toggleGameFinished(true);
      toggleTimeRuns(false);
    }
  }, [typedPlayers]);

  useEffect(() => {
    if (gameFinished) {
      let ls = localStorage.getItem("gamesPlayed");
      if (!!ls) {
        const lsTyped = JSON.parse(ls).typedChampions;
        let newResult = !lsTyped
          ? {
              typedChampions: {
                bestResult: {
                  quantity: typedPlayers.length,
                  time: 60 - timeLeft,
                },
              },
            }
          : lsTyped.bestResult.time < 60 - timeLeft
          ? { typedChampions: { ...lsTyped } }
          : lsTyped.bestResult.time === 60 - timeLeft &&
            lsTyped.bestResult.quantity > typedPlayers.length
          ? { typedChampions: { ...lsTyped } }
          : {
              typedChampions: {
                bestResult: {
                  quantity: typedPlayers.length,
                  time: 60 - timeLeft,
                },
              },
            };
        if (timeLeft < 60) {
          newResult = {
            typedChampions: {
              ...newResult.typedChampions,
              gameFinished: "true",
            },
          };
        }
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
            typedChampions: {
              gameFinished: "true",
              bestResult: {
                quantity: typedPlayers.length,
                time: 60 - timeLeft,
              },
            },
          })
        );
      }
    }
  }, [gameFinished]);
  const startGame = () => {
    sortedNames.current = sortPlayers();
    setTypedPlayers([]);
    toggleTimeRuns(true);
    setTimeLeft(60);
    inputRef.current?.focus();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !!timeRuns && setInputValue(e.target.value?.toUpperCase());
  };
  function sortPlayers() {
    return [
      ...players
        .map((player) => player.name.replace(/\w+ /, ""))
        .sort((a, b) => 0.5 - Math.random())
        .map((names) =>
          names.replaceAll(/([áéíóú])/gi, (match: string): string => {
            const tildes: { [key: string]: string } = {
              á: "a",
              é: "e",
              í: "i",
              ó: "o",
              ú: "u",
            };
            return tildes[match];
          })
        ),
    ];
  }

  return (
    <div id="TypeChampionsGame">
      <Header>
        <Title title="How many players can you type?" />
      </Header>
      {modalOn && (
        <Modal
          toggleModalOn={toggleModalOn}
          buttonText="Ready?"
          modalButtonFunction={startGame}
        >
          <ModalStart />
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
          {typedPlayers.length === 26 ? (
            <div>
              <h2>Congratulations!</h2>
              <h3>You mastered this game!</h3>
              <h3>You got typed all 26 champions in {60 - timeLeft} seconds</h3>
            </div>
          ) : (
            <div>
              <h2>
                {typedPlayers.length > 23
                  ? "Very well done!"
                  : typedPlayers.length > 20
                  ? "Well done"
                  : typedPlayers.length > 10
                  ? "Good job!"
                  : "Better get some practice"}
              </h2>
              <h3>
                {typedPlayers.length > 20
                  ? "You almost got them all!"
                  : typedPlayers.length > 10
                  ? "You'll have better luck next time"
                  : "That's what our 🐐 would do"}
              </h3>
              <h3>You typed {typedPlayers.length}/26 champions</h3>
            </div>
          )}
        </Modal>
      )}
      <div id="type-all-champions-container">
        {gameFinished ? (
          <h2 id="time-left">Time left: {timeLeft}</h2>
        ) : (
          <Timer
            timeRuns={timeRuns}
            toggleTimeRuns={toggleTimeRuns}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
          />
        )}
        <div id="names-box">
          <h2 id="current-player">
            {sortedNames.current[currentIndex.current].toUpperCase()}
          </h2>
          <input
            id="input-player"
            ref={inputRef}
            type="text"
            spellCheck={false}
            value={inputValue}
            autoFocus
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <h3 id="typed-players">Players typed: {typedPlayers.length}</h3>
      </div>
    </div>
  );
}
