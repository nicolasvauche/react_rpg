import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Character from "../../components/Character";
import Inventory from "../../components/Inventory";
import FleeBtn from "../../components/FleeBtn";
import Enemy from "../../components/Enemy";
import CombatLog from "../../components/CombatLog";
import "./index.scss";

const CombatPage = () => {
  const [combat, setCombat] = useState(null);
  const [player, setPlayer] = useState(null);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  const rollDice = (sides = 6) => Math.floor(Math.random() * sides) + 1;

  useEffect(() => {
    const storedCombat = localStorage.getItem("currentCombat");
    const storedCharacter = localStorage.getItem("character");

    if (storedCombat) setCombat(JSON.parse(storedCombat));
    if (storedCharacter) setPlayer(JSON.parse(storedCharacter));
  }, []);

  const updateCharacter = (updatedCharacter) => {
    setPlayer(updatedCharacter);
    localStorage.setItem("character", JSON.stringify(updatedCharacter));
  };

  const updateCombat = (updatedEnemies) => {
    const updatedCombat = {
      ...combat,
      enemies: updatedEnemies,
    };
    setCombat(updatedCombat);
    localStorage.setItem("currentCombat", JSON.stringify(updatedCombat));
  };

  const addLog = (entry) => {
    setLogs((prev) => [
      ...prev,
      typeof entry === "string" ? { text: entry } : entry,
    ]);
  };

  const handleEnemyCounterAttack = (enemy, updatedEnemies, updatedPlayer) => {
    const enemyRoll = rollDice();
    const isEnemyCrit = enemyRoll === 6;

    let enemyAttack = enemy.damage + enemyRoll;
    if (isEnemyCrit) enemyAttack *= 2;

    const damageToPlayer = Math.max(enemyAttack - player.defense, 1);
    updatedPlayer.health = Math.max(updatedPlayer.health - damageToPlayer, 0);

    addLog({
      text: `🎲 ${enemy.name} lance un dé : +${enemyRoll}${
        isEnemyCrit ? " (CRITIQUE !)" : ""
      }`,
      isCrit: isEnemyCrit,
    });

    addLog({
      text: `💢 ${enemy.name} riposte et inflige ${damageToPlayer} dégâts à ${
        player.name
      }.${isEnemyCrit ? " (x2 dégâts)" : ""}`,
      isCrit: isEnemyCrit,
    });

    updateCharacter(updatedPlayer);
    updateCombat(updatedEnemies);

    const allEnemiesDead = updatedEnemies.every((e) => e.health <= 0);
    const playerDead = updatedPlayer.health <= 0;

    if (playerDead) {
      setTimeout(() => navigate("/defaite"), 1000);
    } else if (allEnemiesDead) {
      setTimeout(() => navigate("/victoire"), 1000);
    }
  };

  const handleAttack = (enemy) => {
    const playerRoll = rollDice();
    const isPlayerCrit = playerRoll === 6;

    let playerAttack = player.damage + playerRoll;
    if (isPlayerCrit) playerAttack *= 2;

    const damageToEnemy = Math.max(playerAttack - enemy.defense, 1);
    const newEnemyHealth = Math.max(enemy.health - damageToEnemy, 0);
    const enemyIsDead = newEnemyHealth <= 0;

    const updatedEnemies = combat.enemies.map((e) =>
      e.id === enemy.id
        ? { ...e, health: newEnemyHealth, dead: enemyIsDead }
        : e
    );

    const updatedPlayer = { ...player };

    addLog({
      text: `🎲 ${player.name} lance un dé : +${playerRoll}${
        isPlayerCrit ? " (CRITIQUE !)" : ""
      }`,
      isCrit: isPlayerCrit,
    });

    addLog({
      text: `🗡️ ${player.name} attaque ${
        enemy.name
      } et lui inflige ${damageToEnemy} dégâts${
        isPlayerCrit ? " (x2 dégâts)" : ""
      }.`,
      isCrit: isPlayerCrit,
    });

    if (enemyIsDead) {
      addLog({ text: `💀 ${enemy.name} est vaincu !` });
      updateCombat(updatedEnemies);
      updateCharacter(updatedPlayer);
    } else {
      handleEnemyCounterAttack(enemy, updatedEnemies, updatedPlayer);
    }

    const allEnemiesDead = updatedEnemies.every((e) => e.health <= 0);
    const playerDead = updatedPlayer.health <= 0;

    if (playerDead) {
      setTimeout(() => navigate("/defaite"), 1000);
    } else if (allEnemiesDead) {
      setTimeout(() => navigate("/victoire"), 1000);
    }
  };

  const handleCastSpell = (enemy) => {
    if (!player?.spell) {
      addLog("🚫 Aucun sort connu !");
      return;
    }

    const spell = player.spell;

    if (player.mana < spell.manaCost) {
      addLog("😰 Pas assez de mana pour lancer ce sort !");
      return;
    }

    const updatedPlayer = { ...player, mana: player.mana - spell.manaCost };
    let updatedEnemies = [...combat.enemies];

    if (spell.effect === "damage") {
      const damage = spell.amount;
      const newEnemyHealth = Math.max(enemy.health - damage, 0);
      const enemyIsDead = newEnemyHealth <= 0;

      updatedEnemies = updatedEnemies.map((e) =>
        e.id === enemy.id
          ? { ...e, health: newEnemyHealth, dead: enemyIsDead }
          : e
      );

      addLog({
        text: `🔥 ${player.name} lance *${spell.name}* sur ${enemy.name} et inflige ${damage} dégâts !`,
        isCrit: false,
      });

      if (enemyIsDead) {
        let deathMessage = `💀 ${enemy.name} est vaincu !`;

        if (spell.name.toLowerCase().includes("feu")) {
          deathMessage = `💀 ${enemy.name} est réduit en cendres !`;
        } else if (spell.name.toLowerCase().includes("poison")) {
          deathMessage = `💀 ${enemy.name} se tord de douleur et s’effondre, empoisonné !`;
        } else if (spell.name.toLowerCase().includes("foudroyante")) {
          deathMessage = `💀 ${enemy.name} meurt foudroyé !`;
        }

        addLog({ text: deathMessage });
        updateCombat(updatedEnemies);
        updateCharacter(updatedPlayer);
      } else {
        handleEnemyCounterAttack(enemy, updatedEnemies, updatedPlayer);
      }
    } else if (spell.effect === "heal") {
      const healed = Math.min(spell.amount, player.healthMax - player.health);
      updatedPlayer.health += healed;

      addLog({
        text: `💖 ${player.name} se soigne avec *${spell.name}* et récupère ${healed} PV.`,
        isCrit: true,
      });

      updateCharacter(updatedPlayer);
    }

    const allEnemiesDead = updatedEnemies.every((e) => e.health <= 0);
    const playerDead = updatedPlayer.health <= 0;

    if (playerDead) {
      setTimeout(() => navigate("/defaite"), 1000);
    } else if (allEnemiesDead) {
      setTimeout(() => navigate("/victoire"), 1000);
    }
  };

  if (!combat || !player) return <p>Chargement du combat en cours...</p>;

  return (
    <div className="combat-page">
      <h1>Il faut Sauver Gronnella</h1>
      <h2>Combat</h2>

      <div className="combat-sides">
        <div className="left-panel">
          <Character character={player} showStatBar combatMode />
          <Inventory character={player} updateCharacter={updateCharacter} />
        </div>

        <div className="right-panel">
          <div className="enemies">
            {combat.enemies.map((enemy) => (
              <Enemy
                key={enemy.id}
                enemy={enemy}
                onAttack={() => handleAttack(enemy)}
                onCast={() => handleCastSpell(enemy)}
                canCast={!!player.spell}
                canAffordSpell={
                  player.spell && player.mana >= player.spell.manaCost
                }
              />
            ))}
          </div>
          <CombatLog logs={logs} />
          <div className="flee-button">
            <FleeBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatPage;
