import React, { useState } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Modal = ({ open, children, onClose, setIsOpen, character, id }) => {
  const [champion, setChampion] = useState([]);
  // fetch API

  const callChampion = async () => {
    // console.log(param);
    let response = await fetch("/apileague/get_champion/" + id.toString());
    let body = await response.text();
    setChampion(body);
  };

  const handleClick = (e) => {
    setIsOpen(false);
  };

  if (!open) return null;

  callChampion();
  console.log({ id });

  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={handleClick} />
      <div className="modalPopUp">
        {children}
        {character.name}
        {champion}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
