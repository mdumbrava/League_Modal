import "./Modal.css";
import ReactDOM from "react-dom";

const Modal = ({ open, children, onClose, setIsOpen, character, id }) => {
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
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
