import React from "react";

export default function Title({title}: {title:string}) {
  return (
    <h1 className="game-title">
      {title}
    </h1>
  );
}
