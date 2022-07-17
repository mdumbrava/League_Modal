import React, { useState } from "react";
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
  const [toggleState, setToggleState] = useState(1);

  const handleClick = (e) => {
    setIsOpen(false);
  };

  if (!open) return null;

  const toggleTab = (index) => {
    setToggleState(index);
  };
  // console.log(typeof abilities);
  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={handleClick} />
      <div className="modalPopUp">
        {children}

        <div className="container">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              About Champion
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Champion Abilities
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Cosmetics
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <div className="flex-column">
                <div>
                  <h2>{about.title}</h2>
                  <hr />
                  <p>
                    {about.position}
                    <br />
                    {about.class}
                    <br />
                    <br />
                    <u>About Her:</u>
                    <br />
                    <br />
                    <span>{about.description}</span>
                  </p>
                </div>
                <div>
                  <img className="img-model" src={about.pic} alt="model" />
                </div>
              </div>
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              {/* <h2>Content 2</h2> */}
              <hr />

              <div>
                {abilities.map((ability) => (
                  <div key={ability.id}>
                    <div className="flex-column">
                      <div className="img-flex">
                        <img
                          className="img-abc"
                          src={ability.icon}
                          alt="icons"
                        />
                      </div>
                      <div className="text-flex">
                        <h4>{ability.title}</h4>
                        {ability.text}
                      </div>
                    </div>
                  </div>
                ))}

                <br />
              </div>
            </div>

            <div
              className={
                toggleState === 3 ? "content  active-content" : "content"
              }
            >
              <hr />
              <div className="skins-div">
                {cosmetics.map((splash) => (
                  <div key="{splash.id}">
                    <img
                      className="img-model"
                      src={splash.pic}
                      alt={splash.pic}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
