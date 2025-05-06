import { useEffect, useState } from "react";
import quests from "../../data/quests.json";
import combats from "../../data/combats.json";
import creatures from "../../data/creatures.json";
import QuestStep from "../../components/QuestStep";
import InventoryBtn from "../../components/InventoryBtn";
import CombatBtn from "../../components/CombatBtn";
import "./index.scss";

const GamePage = () => {
  const [currentQuest, setCurrentQuest] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentQuest");
    let quest = stored ? JSON.parse(stored) : quests.find((q) => q.id === 1);

    if (quest) {
      localStorage.setItem("currentQuest", JSON.stringify(quest));
      setCurrentQuest(quest);

      // Vérifie si un combat est déjà en cours
      const storedCombat = localStorage.getItem("currentCombat");
      if (!storedCombat) {
        const combatData = combats.find((c) => c.questId === quest.id);
        if (combatData) {
          const fullEnemies = [];

          combatData.enemies.forEach(({ name, quantity }) => {
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
            questId: quest.id,
            enemies: fullEnemies,
          };

          localStorage.setItem("currentCombat", JSON.stringify(currentCombat));
        }
      }
    }
  }, []);

  return (
    <>
      <h1>Il faut Sauver Gronnella</h1>
      <h2>Quête en cours</h2>

      <QuestStep quest={currentQuest} />

      <div className="action-buttons">
        <InventoryBtn />
        <CombatBtn />
      </div>
    </>
  );
};

export default GamePage;
