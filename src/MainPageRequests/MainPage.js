import React, { useState } from "react";
import "./MainPage.css";
import Modal from "./Modal";

const MainPage = ({ character, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [champion, setChampion] = useState([]);
  // fetch API

  const callChampion = async () => {
    // console.log(param);
    let response = await fetch("/apileague/get_champion/" + id.toString());
    let body = await response.json();
    setChampion(body);
    console.log(champion.about);
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
              callChampion();
            }}
            key={id}
            src={character.pic}
          />
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            // onOpen={() => callChampion()}
            setIsOpen={setIsOpen}
            character={character}
            id={id}
            champion={champion}
          ></Modal>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
