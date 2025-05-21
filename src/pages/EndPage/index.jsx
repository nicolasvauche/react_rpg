import { useEffect } from "react";
import { useNavigate } from "react-router";
import npcs from "../../data/npcs.json";
import "./index.scss";

const EndPage = () => {
  const navigate = useNavigate();
  const gronnella = npcs.find((npc) => npc.name.includes("Gronnella"));

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <h1>Il faut Sauver Gronnella</h1>
      <h2>🏰 Fin de l'Aventure 🏰</h2>

      <div className="end">
        {gronnella && (
          <img
            src={`/img/${gronnella.picture}`}
            alt={gronnella.name}
            className="gronnella-img"
          />
        )}

        <p>
          Vous avez vaincu les rats, les gobelins, le minotaure et même le
          dragon ! La princesse Gronnella est propre et elle s'est changée,
          l’ordre est rétabli, et le royaume vous doit une fière chandelle (et
          un bon bain).
        </p>
        <p>
          Elle est partie sans dire merci… mais hé, c’est le destin des héros.
        </p>
        <p>
          Prenez une pause, savourez votre gloire, puis… recommencez tout, parce
          que le jeu est bon. Pas vrai ?
        </p>

        <button className="action-button" onClick={handleReturn}>
          Rejouer depuis le début
        </button>
      </div>
    </>
  );
};

export default EndPage;
