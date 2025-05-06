import { useEffect, useState } from "react";
import items from "../../data/items.json";
import ItemBtn from "../ItemBtn";
import "./index.scss";

const Shop = ({ character, updateCharacter, onInventoryChange }) => {
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    setShopItems(items);
  }, []);

  if (!character) return null;

  return (
    <div className="shop">
      <h2>Magasin</h2>
      <div className="shop-items">
        {shopItems.map((item) => (
          <ItemBtn
            key={item.id}
            item={item}
            action="buy"
            character={character}
            updateCharacter={updateCharacter}
            onInventoryChange={onInventoryChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
