import {
  GiHeartBottle,
  GiCrossedSwords,
  GiBroadsword,
  GiShield,
  GiMagicSwirl,
} from "react-icons/gi";
import "./index.scss";

const Enemy = ({ enemy, onAttack, onCast, canCast, canAffordSpell }) => {
  const percentage =
    enemy.healthMax && enemy.healthMax > 0
      ? Math.min((enemy.health / enemy.healthMax) * 100, 100)
      : 0;

  return (
    <div className={`enemy-card ${enemy.dead ? "dead" : ""}`}>
      <img src={`/img/${enemy.picture}`} alt={enemy.name} />
      <h3>{enemy.name}</h3>

      <div className="enemy-stats">
        <div className="stat-line">
          <span className="icon">
            <GiHeartBottle color="#e74c3c" />
          </span>
          <div className="stat-bar">
            <div
              className="fill"
              style={{ width: `${percentage}%`, backgroundColor: "#e74c3c" }}
            ></div>
            <span className="label">
              {enemy.health} / {enemy.healthMax ?? "?"}
            </span>
          </div>
        </div>
        <div className="stat-line">
          <span className="icon">
            <GiBroadsword color="#f39c12" />
          </span>
          <span>{enemy.damage}</span>
        </div>

        <div className="stat-line">
          <span className="icon">
            <GiShield color="#95a5a6" />
          </span>
          <span>{enemy.defense}</span>
        </div>
      </div>

      <div className="enemy-actions">
        <button onClick={onAttack} disabled={enemy.dead}>
          <GiCrossedSwords className="icon" />
          Attaquer
        </button>

        {canCast && (
          <button
            onClick={onCast}
            disabled={enemy.dead || !canAffordSpell}
            title={!canAffordSpell ? "Pas assez de mana" : ""}
          >
            <GiMagicSwirl className="icon" />
            Lancer un sort
          </button>
        )}
      </div>
    </div>
  );
};

export default Enemy;
