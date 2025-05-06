import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import quests from "../../data/quests.json";
import combats from "../../data/combats.json";
import creatures from "../../data/creatures.json";
import "./index.scss";

const VictoryPage = () => {
  const navigate = useNavigate();
  const alreadyProcessed = useRef(false);

  const [goldReward, setGoldReward] = useState(0);
  const [specialReward, setSpecialReward] = useState("");
  const [questClue, setQuestClue] = useState("");
  const [nextQuestExists, setNextQuestExists] = useState(false);

  useEffect(() => {
    if (alreadyProcessed.current) return;
    alreadyProcessed.current = true;

    const storedCharacter = localStorage.getItem("character");
    const storedQuest = localStorage.getItem("currentQuest");

    if (!storedCharacter || !storedQuest) {
      navigate("/");
      return;
    }

    const character = JSON.parse(storedCharacter);
    const currentQuest = JSON.parse(storedQuest);
    const { reward, clue } = currentQuest;

    const gold = reward?.gold ?? 0;
    const special = reward?.special ?? "";

    character.health = character.healthMax;
    character.mana = character.manaMax;
    character.fortune = (character.fortune ?? 0) + gold;

    localStorage.setItem("character", JSON.stringify(character));
    localStorage.removeItem("currentCombat");

    setGoldReward(gold);
    setSpecialReward(special);
    setQuestClue(clue || "");

    // Préparer la quête suivante, si elle existe
    const nextQuest = quests.find((q) => q.id === currentQuest.id + 1);

    if (nextQuest) {
      setNextQuestExists(true);
      localStorage.setItem("currentQuest", JSON.stringify(nextQuest));

      const combat = combats.find((c) => c.questId === nextQuest.id);
      if (combat) {
        const fullEnemies = [];

        combat.enemies.forEach(({ name, quantity }) => {
          const creature = creatures.find((c) => c.name === name);
          if (creature) {
            for (let i = 0; i < quantity; i++) {
              fullEnemies.push({
                id: `${name}-${i + 1}`,
                ...creature,
                healthMax: creature.health,
              });
            }
          }
        });

        const currentCombat = {
          questId: nextQuest.id,
          enemies: fullEnemies,
        };

        localStorage.setItem("currentCombat", JSON.stringify(currentCombat));
      }
    }
  }, [navigate]);

  const handleContinue = () => {
    if (nextQuestExists) {
      navigate("/jeu");
    } else {
      navigate("/fin");
    }
  };

  return (
    <>
      <h1>Il faut Sauver Gronnella</h1>
      <h2>🎉 Victoire 🎉</h2>

      <div className="victory">
        {questClue && (
          <div className="clue">
            <p dangerouslySetInnerHTML={{ __html: questClue }}></p>
          </div>
        )}

        <div className="infos">
          <p>Vous avez vaincu vos ennemis et accompli un grand exploit !</p>
          <p>💰 Vous gagnez {goldReward} pièces d'or.</p>
          {specialReward && <p>🎁 Vous obtenez : {specialReward}</p>}
          <p>🛌 Vous récupérez toute votre santé et votre mana.</p>
        </div>
      </div>

      <button className="action-button" onClick={handleContinue}>
        {nextQuestExists ? "Continuer l’aventure" : "Fin de l’histoire"}
      </button>
    </>
  );
};

export default VictoryPage;
