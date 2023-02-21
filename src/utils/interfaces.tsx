export interface iPlayers {
  name: string;
  dorsal: number;
  imgQuest: string;
  imgAns: string;
}

export interface iSelected {
  id: string;
  dorsal: number;
}

export interface iCard {
  cards: number[];
  selected: iSelected[];
  disabledCards: string[];
  setDisabledCards: React.Dispatch<React.SetStateAction<string[]>>;
  setSelected: React.Dispatch<React.SetStateAction<iSelected[]>>;
  dorsal: number;
  index: number;
  name: string;
}
export type iCardsSelected = number | undefined;
import React, { useState, useEffect } from "react";

// import {
//   iPlayers,
//   iSelected,
//   iCardsSelected,
//   iBoardProps,
// } from "../../utils/interfaces";

// export default function Board({
//   cards,
//   selected,
//   setSelected,
//   setDisabledCards,
// }: iBoardProps) {

//   function handleClickCard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//     const number = parseInt((e.target as HTMLButtonElement).value);
//     const id = (e.target as HTMLButtonElement).id;
//     if (selected.length < 2) {
//       setSelected((prev) => [...prev, { selected: number, id }]);
//       setDisabledCards((prev) => [...prev, id]);
//     }
//   }
//   return (
//     <div id="board">
//       <h2>Board</h2>
//       {[...cards, ...cards]
//         .sort((a, b) => 0.5 - Math.random())
//         .map((number, i, arr) => (
//           <button
//             key={number + i + Math.random()}
//             className="cardd"
//             value={number}
//             role="button"
//             onClick={handleClickCard}
//           >
//             {number}
//           </button>
//         ))}
//     </div>
//   );
// }
