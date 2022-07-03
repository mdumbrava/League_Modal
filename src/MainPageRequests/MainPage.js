import "./MainPage.css";
import React, { useState } from "react";
import Modal from "./Modal";

const MainPage = ({ character, id }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            onClick={() => setIsOpen(true)}
            key={id}
            src={character.pic}
          />
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            setIsOpen={setIsOpen}
            character={character}
            id={id}
          ></Modal>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
