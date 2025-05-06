import Character from "../Character";
import "./index.css";

const CharacterBtn = ({ character, selectCharacter }) => {
  const createCharacter = () => {
    if (window.confirm("Choisir " + character.name + " ?")) {
      selectCharacter(character);
    }
  };

  return (
    <button title={"Jouer avec " + character.name} onClick={createCharacter}>
      <Character character={character} showStatBar={false} />
    </button>
  );
};

export default CharacterBtn;
