import Item from "../Item";
import { GiReceiveMoney, GiPotionBall } from "react-icons/gi";
import "./index.scss";

const ItemBtn = ({
  item,
  action,
  character,
  updateCharacter,
  updateInventory,
  onInventoryChange,
}) => {
  const handleBuy = () => {
    if (character.fortune < item.price) {
      alert("Pas assez d'or !");
      return;
    }

    const stored = localStorage.getItem("characterItems");
    const inventory = stored ? JSON.parse(stored) : [];

    const existingItem = inventory.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      inventory.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("characterItems", JSON.stringify(inventory));
    if (onInventoryChange) onInventoryChange();

    const updatedCharacter = {
      ...character,
      fortune: character.fortune - item.price,
    };

    updateCharacter(updatedCharacter);
  };

  const handleUse = () => {
    const stat = item.target;
    const max = character[stat + "Max"];
    const newStat = Math.min(character[stat] + item.amount, max);

    const updatedCharacter = {
      ...character,
      [stat]: newStat,
    };

    updateCharacter(updatedCharacter);

    const stored = localStorage.getItem("characterItems");
    const inventory = stored ? JSON.parse(stored) : [];

    const updatedItems = inventory
      .map((i) =>
        i.id === item.id && i.quantity > 0
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter((i) => i.quantity > 0);

    localStorage.setItem("characterItems", JSON.stringify(updatedItems));
    updateInventory(updatedItems);
  };

  const canBuy = character?.fortune >= (item.price ?? 0);

  return (
    <div className="item-wrapper">
      <Item item={item} />

      {action === "use" && (
        <p className="quantity">Quantité : {item.quantity}</p>
      )}

      {action === "buy" && (
        <button
          className="item-button"
          onClick={handleBuy}
          disabled={!canBuy}
          title={!canBuy ? "Pas assez d'or" : ""}
        >
          <GiReceiveMoney className="icon" />
          <span>{item.price} or</span>
        </button>
      )}

      {action === "use" && item.quantity > 0 && (
        <button className="item-button" onClick={handleUse}>
          <GiPotionBall className="icon" />
          <span>
            +{item.amount} {item.target === "health" ? "PV" : "Mana"}
          </span>
        </button>
      )}
    </div>
  );
};

export default ItemBtn;
