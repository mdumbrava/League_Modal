// import React, { useState, useEffect } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Modal = ({
  open,
  children,
  onClose,
  setIsOpen,
  character,
  id,
  abilities,
  key,
}) => {
  const handleClick = (e) => {
    setIsOpen(false);
  };

  if (!open) return null;
  // console.log(typeof abilities);
  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={handleClick} />
      <div className="modalPopUp">
        {children}
        {character.name}
        <br />

        {abilities.map((ability) => (
          <div key={ability.id}>
            <h5> {ability.title}</h5>
            <p>{ability.icon}</p>
            <p> {ability.text}</p>
          </div>
        ))}
        <br />
        {/* <div>
          {champion.abilities.map((champsAbout) => (
            <p>{champsAbout.title}</p>
          ))}
        </div> */}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
