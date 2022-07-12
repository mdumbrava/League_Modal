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
  champion,
}) => {
  const handleClick = (e) => {
    setIsOpen(false);
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={handleClick} />
      <div className="modalPopUp">
        {children}
        {character.name}
        <br />
        {champion.about.class}
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
