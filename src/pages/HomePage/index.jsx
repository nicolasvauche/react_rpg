import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CharacterBtn from "../../components/CharacterBtn";
import characters from "../../data/characters.json";
import "./index.scss";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const storedCharacter = localStorage.getItem("character");

    if (storedCharacter) {
      navigate("/jeu");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const selectCharacter = (selected) => {
    const characterWithMaxStats = {
      ...selected,
    };

    localStorage.setItem("character", JSON.stringify(characterWithMaxStats));
    setCharacter(characterWithMaxStats);
    navigate("/jeu");
  };

  if (isLoading) return null;

  return (
    <>
      <h1>Il faut Sauver Gronnella</h1>
      <h2>Choisissez votre personnage</h2>

      <div className="characters-grid">
        {characters.map((character) => (
          <CharacterBtn
            key={character.id}
            character={character}
            selectCharacter={selectCharacter}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
