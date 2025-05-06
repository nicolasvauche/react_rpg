import { Link } from "react-router";
import { GiCrossedSwords } from "react-icons/gi";
import "./index.scss";

const CombatBtn = () => {
  return (
    <Link to="/combat" className="action-button">
      <GiCrossedSwords className="icon" />
      <span>Combat</span>
    </Link>
  );
};

export default CombatBtn;
