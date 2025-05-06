import { useEffect, useState } from "react";
import ItemBtn from "../ItemBtn";
import "./index.scss";

const Inventory = ({ character, updateCharacter, version = 0 }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("characterItems");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, [version]);

  const updateInventory = (updatedItems) => {
    setItems(updatedItems);
    localStorage.setItem("characterItems", JSON.stringify(updatedItems));
  };

  if (!character) return null;

  return (
    <div className="inventory">
      <h2>Objets</h2>
      <div className="inventory-items">
        {items.length === 0 && <p>Votre sac est vide.</p>}
        {items.map((item) => (
          <ItemBtn
            key={item.id}
            item={item}
            action="use"
            character={character}
            updateCharacter={updateCharacter}
            updateInventory={updateInventory}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
