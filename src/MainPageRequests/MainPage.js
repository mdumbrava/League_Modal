import "./MainPage.css";

const MainPage = ({ character, id }) => {
  return (
    <div>
      <div className="championDiv">
        <h3 className="championTitle" key={id}>
          {character.name}
        </h3>
        <img className="championPic" alt="pics" key={id} src={character.pic} />
      </div>
    </div>
  );
};

export default MainPage;
