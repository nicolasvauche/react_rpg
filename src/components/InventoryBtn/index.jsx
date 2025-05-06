import { Link } from "react-router";
import { GiBackpack } from "react-icons/gi";
import "./index.scss";

const InventoryBtn = () => {
  return (
    <Link to="/inventaire" className="action-button">
      <GiBackpack className="icon" />
      <span>Inventaire</span>
    </Link>
  );
};

export default InventoryBtn;
