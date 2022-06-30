const MainPage = ({ character, id }) => {
  return (
    <div>
      <div className="comments">
        <h3 key={id}>{character.name}</h3>
        <p key={id}>{character.pic}</p>
      </div>
    </div>
  );
};

export default MainPage;
