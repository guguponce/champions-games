import React, { useEffect, useMemo, useRef, useState } from "react";
import Confeti from "./Confeti";
import { players } from "../utils/utils";
import { iSelected } from "../utils/interfaces";
import Title from "./Title";
import Card from "./champions-memory/Card";
import Modal from "./Modal";
import ModalStart from "./champions-memory/Modal-Ch-Start";
import GameOver from "./champions-memory/Modal-Ch-GameOver";
import ModalWinner from "./champions-memory/Modal-Ch-Winner";
import Header from "./Header";

export default function ChampionsMemory() {
  const playersArr = useRef([...players].sort(() => 0.5 - Math.random()));
  const [modalOn, toggleModalOn] = useState(true);
  const [recycle, toggleRecycle] = useState(false);
  const [dorsals, setDorsals] = useState<number[]>(
    [...playersArr.current].splice(0, 2).map((player) => player.dorsal)
  );
  const cards = useMemo(
    () => [...dorsals, ...dorsals].sort((a, b) => 0.5 - Math.random()),
    [dorsals]
  );
  const [selected, setSelected] = useState<iSelected[]>([]);
  const [found, setFound] = useState<number[]>([]);
  const [disabledCards, setDisabledCards] = useState<string[]>([]);
  const [lives, setLives] = useState(4);
  const [reset, setReset] = useState(false);
  const [gameFinished, toggleGameFinished] = useState(false);

  let level = useRef(1);

  useEffect(() => {
    if (selected.length === 2) {
      const [a, b] = [...selected];
      if (a.dorsal === b.dorsal) {
        setDisabledCards((prev) => [...prev, a.id, b.id]);
        setFound((prev) => [...prev, a.dorsal]);
      } else {
        setLives((prev) => prev - 1);
        setDisabledCards((prev) =>
          [...prev].filter((c) => c !== a.id && c !== b.id)
        );
      }
      setSelected([]);
    }
    if (found.length === dorsals.length) {
      setLives(dorsals.length * 4);
      setDorsals((prev) => {
        const newCardsQuantity = dorsals.length * 2;
        return [...playersArr.current]
          .splice(0, newCardsQuantity)
          .map((player) => player.dorsal);
      });
      setSelected([]);
      setFound([]);
      setDisabledCards([]);
      level.current++;
    }
  }, [selected]);
  useEffect(() => {
    if (lives === 0) {
      toggleModalOn(true);
      toggleGameFinished(true);
    } else if (lives === 5) {
      toggleRecycle(true);
      setTimeout(() => {
        toggleRecycle(false);
      }, 7000);
    }
  }, [lives]);
  useEffect(() => {
    level.current = 1;
  }, [reset]);
  useEffect(() => {
    if (level.current > 1) {
      let ls = localStorage.getItem("gamesPlayed");
      console.log("ls", ls);

      if (!!ls) {
        const lsMemory = JSON.parse(ls).memory;
        const newResult = !lsMemory
          ? { memory: { bestResult: level.current - 1 } }
          : lsMemory.bestResult < level.current - 1
          ? { memory: { bestResult: level.current - 1 } }
          : { memory: { ...lsMemory } };
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
            memory: { bestResult: level.current - 1 },
          })
        );
      }
      level.current === 5 && toggleGameFinished(true);
    }
  }, [level.current]);

  useEffect(() => {
    if (gameFinished && level.current === 5) {
      let ls = localStorage.getItem("gamesPlayed");
      ls
        ? localStorage.setItem(
            "gamesPlayed",
            JSON.stringify({
              ...JSON.parse(ls),
              memory: { gameFinished: "true" },
            })
          )
        : localStorage.setItem(
            "gamesPlayed",
            JSON.stringify({ memory: { gameFinished: "true" } })
          );
    }
  }, [gameFinished]);

  const resetGame = () => {
    setReset(true);
    level.current = 1;
    setSelected([]);
    setFound([]);
    setDisabledCards([]);
    setLives(4);
    setDorsals([players[9].dorsal, players[6].dorsal]);
  };
  return (
    <div id="MemoryGame">
      {level.current === 5 && (
        <Modal
          toggleModalOn={toggleModalOn}
          buttonText="Would you like to play again?"
          modalButtonFunction={resetGame}
        >
          <ModalWinner>
            <Confeti recycle={recycle} />
          </ModalWinner>
        </Modal>
      )}
      {modalOn && (
        <Modal toggleModalOn={toggleModalOn} buttonText="Start game!">
          <ModalStart />
        </Modal>
      )}
      <Header>
        <Title title="Try out your memory!" />
      </Header>
      <div id="level-lives-container">
        <h2 id="level">Level: {level.current}</h2>
        <h2 id="lives">Lives: {lives}</h2>
      </div>

      {lives === 0 ? (
        <Modal
          toggleModalOn={toggleModalOn}
          buttonText="Would you like to play again?"
          modalButtonFunction={resetGame}
        >
          <GameOver level={level.current} />
        </Modal>
      ) : (
        <div id="board">
          {[...cards].map((number, i) => (
            <Card
              key={i}
              name={players[number - 1].name}
              cards={cards}
              selected={selected}
              setSelected={setSelected}
              setDisabledCards={setDisabledCards}
              disabledCards={disabledCards}
              dorsal={number}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
