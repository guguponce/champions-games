import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface iConfettiProps {
  recycle: boolean;
}
export default function Confeti({ recycle }: iConfettiProps) {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const checkDimension = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", checkDimension);

    return () => {
      window.removeEventListener("resize", checkDimension);
    };
  }, [windowDimension]);

  return (
    <Confetti
      width={windowDimension.width}
      recycle={recycle}
      height={windowDimension.height}
      colors={["#529ed1", "#fff"]}
      numberOfPieces={3000}
    />
  );
}
