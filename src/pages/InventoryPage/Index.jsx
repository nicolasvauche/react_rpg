import { useEffect, useState } from "react";
import Character from "../../components/Character";
import Inventory from "../../components/Inventory";
import Shop from "../../components/Shop";
import GameBtn from "../../components/GameBtn";
import "./index.scss";

const InventoryPage = () => {
  const [character, setCharacter] = useState(null);
  const [inventoryVersion, setInventoryVersion] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("character");
    if (stored) {
      setCharacter(JSON.parse(stored));
    }
  }, []);

  const updateCharacter = (updatedCharacter) => {
    setCharacter(updatedCharacter);
    localStorage.setItem("character", JSON.stringify(updatedCharacter));
  };

  const handleInventoryChange = () => {
    setInventoryVersion((prev) => prev + 1);
  };

  return (
    <>
      <h1>Il faut Sauver Gronnella</h1>
      <h2>Inventaire</h2>

      {character && (
        <div className="character-inventory-layout">
          <div className="left-panel">
            <Character character={character} />
          </div>

          <div className="right-panel">
            <Inventory
              character={character}
              updateCharacter={updateCharacter}
              version={inventoryVersion}
            />
            <Shop
              character={character}
              updateCharacter={updateCharacter}
              onInventoryChange={handleInventoryChange}
            />
          </div>
        </div>
      )}

      <div className="return-btn">
        <GameBtn />
      </div>
    </>
  );
};

export default InventoryPage;
