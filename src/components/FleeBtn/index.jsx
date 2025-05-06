import { Link } from "react-router";
import { GiReturnArrow } from "react-icons/gi";
import "./index.scss";

const FleeBtn = () => {
  return (
    <Link to="/jeu" className="action-button">
      <GiReturnArrow className="icon" />
      <span>Fuir le Combat</span>
    </Link>
  );
};

export default FleeBtn;
