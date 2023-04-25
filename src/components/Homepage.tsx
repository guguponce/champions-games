import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Title from "./Title";

interface iGamesPlayed {
  memory?: { bestResult?: number; gameFinished?: "true" };
  guessChampion?: {
    bestResult?: number;
    gameFinished?: "true";
  };
  typedChampions?: {
    gameFinished?: "true";
    bestResult?: {
      quantity: number;
      time: number;
    };
  };
}

export default function Homepage() {
  const [gamesPlayed, setGamesPlayed] = useState<iGamesPlayed>();
  useEffect(() => {
    const ls = localStorage.getItem("gamesPlayed");
    if (ls) {
      setGamesPlayed(JSON.parse(ls));
    }
  }, []);


  return (
    <div id="homepage-container">
      <Header id="homepage-header">
        <Title title="World Cup Champions Games" />
      </Header>
      <main
        id="games-container"
        className={!!gamesPlayed ? "games-played-container" : ""}
      >
        <div className={"game-container"}>
          <Link
            to="/guess-your-champion"
            className={`game-link-box ${
              !!gamesPlayed?.guessChampion ? "game-played" : ""
            }`}
          >
            Guess you champion
          </Link>
          {!!gamesPlayed?.guessChampion?.bestResult && (
            <div className="game-results">
              <h2>
                {gamesPlayed?.guessChampion?.gameFinished
                  ? "You've already won this game!"
                  : "Try again to win this game"}
              </h2>

              {gamesPlayed?.guessChampion?.bestResult && (
                <h3>
                  You guessed{" "}
                  <span>{gamesPlayed?.guessChampion?.bestResult}</span>{" "}
                  {gamesPlayed?.guessChampion?.bestResult === 1
                    ? "champion"
                    : "champions"}
                </h3>
              )}
            </div>
          )}
        </div>
        <div className="game-container">
          <Link
            to="/champions-memory"
            className={`game-link-box ${
              !!gamesPlayed?.memory ? "game-played" : ""
            }`}
          >
            Champions Memory
          </Link>
          {!!gamesPlayed?.memory?.bestResult && (
            <div className="game-results">
              <h2>
                {gamesPlayed?.memory?.gameFinished
                  ? "You mastered this game!"
                  : "Next time you'll rock!"}
              </h2>

              {gamesPlayed?.memory?.gameFinished ? (
                <h3>Your memory is prodigious!</h3>
              ) : (
                <h3>
                  You made it until level:{" "}
                  <span>{gamesPlayed?.memory?.bestResult}</span>
                </h3>
              )}
            </div>
          )}
        </div>
        <div className="game-container">
          <Link
            to="/type-champions"
            className={`game-link-box ${
              !!gamesPlayed?.typedChampions ? "game-played" : ""
            }`}
          >
            Type all Champions
          </Link>

          {!!gamesPlayed?.typedChampions?.bestResult && (
            <div className="game-results">
              <h2>
                {gamesPlayed?.typedChampions?.gameFinished
                  ? "Your fingers are on fire!"
                  : "Come try it again!"}
              </h2>

              {gamesPlayed?.typedChampions?.gameFinished ? (
                <h3>
                  <span>
                    {gamesPlayed?.typedChampions?.bestResult?.quantity}
                  </span>{" "}
                  players in{" "}
                  <span>{gamesPlayed?.typedChampions?.bestResult?.time} seconds</span>!
                  {" "}{gamesPlayed?.typedChampions?.bestResult?.time<60 ? "Weren't you Mozart in another life?" : "Next time you'll type them all"}
                </h3>
              ) : (
                `You are faster than just ${
                  gamesPlayed?.typedChampions?.bestResult?.quantity
                } ${
                  gamesPlayed?.typedChampions?.bestResult?.quantity === 1
                    ? "champion"
                    : "champions"
                } per minute`
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
