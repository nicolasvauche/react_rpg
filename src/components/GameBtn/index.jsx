import { Link } from "react-router";
import { GiReturnArrow } from "react-icons/gi";
import "./index.scss";

const GameBtn = () => {
  return (
    <Link to="/jeu" className="action-button">
      <GiReturnArrow className="icon" />
      <span>Retour au Jeu</span>
    </Link>
  );
};

export default GameBtn;
