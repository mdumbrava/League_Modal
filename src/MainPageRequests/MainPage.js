import React, { useState } from "react";
import "./MainPage.css";
import Modal from "./Modal";

const MainPage = ({ character, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [about, setAbout] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [cosmetics, setCosmetics] = useState([]);

  const callAbout = async () => {
    let response = await fetch("/apileague/get_about/" + id.toString());
    let body = await response.json();
    setAbout(body);
  };
  const callAbilities = async () => {
    let response = await fetch("/apileague/get_abilities/" + id.toString());
    let body = await response.json();
    setAbilities(body);
  };
  const callCosmetics = async () => {
    let response = await fetch("/apileague/get_cosmetics/" + id.toString());
    let body = await response.json();
    setCosmetics(body);
  };

  return (
    <div>
      <div className="championDiv">
        <h3 className="championTitle" key={id}>
          {character.name}
        </h3>
        <div className="buttonWrap">
          <img
            className="championPic"
            alt="pics"
            onClick={() => {
              setIsOpen(true);
              callAbout();
              callAbilities();
              callCosmetics();
            }}
            key={id}
            src={character.pic}
          />
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            setIsOpen={setIsOpen}
            character={character}
            id={id}
            about={about}
            abilities={abilities}
            cosmetics={cosmetics}
          ></Modal>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
