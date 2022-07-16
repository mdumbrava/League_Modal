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
  about,
  abilities,
  cosmetics,
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

        {about.title}
        <br />
        {about.position}

        {cosmetics.map((ability) => (
          <div key={ability.id}>
            <h5> {ability.pic}</h5>
          </div>
        ))}
        <br />

        {abilities.map((ability) => (
          <div key={ability.id}>
            <h5> {ability.icon}</h5>
          </div>
        ))}
        <br />
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
