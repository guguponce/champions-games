import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { iCard } from "../../utils/interfaces";
import { players } from "../../utils/utils";
export default function Card({
  cards,
  selected,
  setSelected,
  setDisabledCards,
  disabledCards,
  dorsal,
  index,
  name,
}: iCard) {
  const [flipped, setFlipped] = useState(true);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
  });
  const checkDimension = () => {
    setWindowDimension({
      width: window.innerWidth,
    });
  };
  //----------------States----------------------------------

  //----------------useEffects------------------------------
  useEffect(() => {
    window.addEventListener("resize", checkDimension);

    return () => {
      window.removeEventListener("resize", checkDimension);
    };
  }, [windowDimension]);
  useEffect(() => {}, [flipped]);

  useEffect(() => {
    setFlipped((flipped) =>
      !!selected.some((selCard) => selCard.id === index.toString()) ||
      !!disabledCards.some((disCard) => disCard === index.toString())
        ? false
        : true
    );
  }, [selected, disabledCards]);

  //----------------useEffects------------------------------

  //----------------functions-------------------------------

  function handleClickCard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const number = parseInt((e.target as HTMLButtonElement).value);
    const id = (e.target as HTMLButtonElement).id;
    if (selected.length < 2) {
      setSelected((prev) => [...prev, { dorsal: number, id }]);
    }
  }

  //----------------functions-------------------------------
  const nodeRef = React.useRef(null);
  return (
    <div className="card-container" key={index + dorsal + ""}>
      <CSSTransition
        nodeRef={nodeRef}
        in={flipped}
        timeout={700}
        classNames="flip"
      >
        <div
          ref={nodeRef}
          key={index}
          style={
            windowDimension.width >= 700 && cards.length > 8
              ? { width: "140px", margin: "0.5rem" }
              : windowDimension.width >= 600 && cards.length > 16
              ? { width: "100px", margin: "0.5rem" }
              : windowDimension.width >= 600 && cards.length > 8
              ? { width: "130px", margin: "0.25rem" }
              : windowDimension.width >= 600 && cards.length > 4
              ? { width: "175px", margin: "0.5rem 1rem" }
              : // : windowDimension.width >= 480 && cards.length === 4
              // ? { width: "175px", margin: "1rem" }
              windowDimension.width >= 480 && cards.length > 16
              ? { width: "70px", margin: "0.25rem" }
              : windowDimension.width >= 480 && cards.length > 8
              ? { width: "100px", margin: "0.25rem" }
              : windowDimension.width >= 480 && cards.length > 4
              ? { width: "125px", margin: "0.5rem 1rem" }
              : windowDimension.width >= 480 && cards.length === 4
              ? { width: "175px", margin: "1rem" }
              : windowDimension.width < 480 && cards.length > 16
              ? { width: "60px", height: "60px" }
              : windowDimension.width < 480 && cards.length > 8
              ? { width: "80px", height: "80px" }
              : windowDimension.width < 480 && cards.length > 4
              ? { width: "100px" }
              : windowDimension.width < 480 && cards.length === 4
              ? { width: "100px" }
              : {}
          }
          className="card"
          role="button"
          // ref={nodeRef}
        >
          <button
            id={index + ""}
            className={`front-face`}
            style={{
              backgroundSize: "cover",
            }}
            //   disabled={flipped}
            value={dorsal}
            role="button"
            onClick={handleClickCard}
          >
            {/* <span onClick={handleClickCard} className="sun" /> */}
          </button>
          <div
            className="back-face"
            style={{
              backgroundImage: `url("${
                players.find((player) => player.dorsal === dorsal)?.imgAns
              }")`,
            }}
          ></div>
        </div>
      </CSSTransition>
    </div>
  );
}
