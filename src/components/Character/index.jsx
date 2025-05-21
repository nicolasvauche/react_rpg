import {
  GiHeartBottle,
  GiMagicSwirl,
  GiBroadsword,
  GiShield,
  GiTwoCoins,
  GiSpellBook,
} from "react-icons/gi";
import "./index.scss";

const StatBar = ({ current, max = 100, color }) => {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <div className="stat-bar">
      <div
        className="fill"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      ></div>
      <span className="label">
        {current} / {max}
      </span>
    </div>
  );
};

const Character = ({ character, showStatBar = true, combatMode = false }) => {
  if (!character) return null;  

  return (
    <div className="character-card">
      <img src={"/img/" + character.picture} alt={character.name} />
      <h3>{character.name}</h3>
      <h4>{character.class}</h4>

      <div className="character-stats">
        {/* Santé */}
        <div className="stat-line">
          <span className="icon">
            <GiHeartBottle color="#e74c3c" />
          </span>
          {showStatBar ? (
            <StatBar
              current={character.health}
              max={character.healthMax}
              color="#e74c3c"
            />
          ) : (
            <span>{character.healthMax}</span>
          )}
        </div>

        {/* Mana */}
        <div className="stat-line">
          <span className="icon">
            <GiMagicSwirl color="#3498db" />
          </span>
          {showStatBar ? (
            <StatBar
              current={character.mana}
              max={character.manaMax}
              color="#3498db"
            />
          ) : (
            <span>{character.manaMax}</span>
          )}
        </div>

        <div className="stat-line">
          <span className="icon">
            <GiBroadsword color="#f39c12" />
          </span>
          <span>{character.damage}</span>
        </div>

        <div className="stat-line">
          <span className="icon">
            <GiShield color="#95a5a6" />
          </span>
          <span>{character.defense}</span>
        </div>

        {/* Autres stats si on n'est PAS en mode combat */}
        {!combatMode && (
          <>
            <div className="stat-line">
              <span className="icon">
                <GiTwoCoins color="#f1c40f" />
              </span>
              <span>{character.fortuneBase}</span>
            </div>
          </>
        )}
      </div>

      {character.spells && character.spells.length > 0 && (
        <div className="character-spells">
          <h5>
            <GiSpellBook color="#9b59b6" /> Sorts connus :
          </h5>
          {character.spells.map((spell, index) => (
            <div className="character-spell" key={index}>
              <p className="spell-name">{spell.name}</p>
              <p className="mana">
                <GiMagicSwirl color="#3498db" /> {spell.mana_cost} mana
              </p>
              <p>
                {spell.effect === "heal"
                  ? `Soigne ${spell.amount} PV`
                  : `Inflige ${spell.amount} dégâts`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Character;
