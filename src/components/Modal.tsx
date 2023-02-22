import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({
  toggleModalOn,
  children,
  buttonText,
  modalButtonFunction,
  otherGames,
}: {
  toggleModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  buttonText: string;
  otherGames?: boolean;
  modalButtonFunction?: () => void;
}) {
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState(buttonText);
  const closeModal = () => {
    if (!!modalButtonFunction) {
      modalButtonFunction();
    }

    toggleModalOn(false);
  };

  const handleMouse = () => {
    setBtnText((btnText) =>
      btnText === "Start Game" ? "Ready?" : "Start Game"
    );
  };

  return (
    <div id="modal">
      <div id="modal-box">
        <div className="children-container">{children}</div>
        <div id="modal-btns">
          <button
            id="play-btn"
            className="button-plain button-confirm modal-btn"
            onMouseOver={handleMouse}
            onMouseLeave={handleMouse}
            onClick={closeModal}
          >
            {btnText}
          </button>
          <button
            id="other-games-btn"
            className="button-plain button-confirm modal-btn"
            onClick={() => navigate("/")}
          >
            Other games
          </button>
        </div>
      </div>
    </div>
  );
}
