import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import InventoryPage from "../pages/InventoryPage";
import CombatPage from "../pages/CombatPage";
import VictoryPage from "../pages/VictoryPage";
import DefeatPage from "../pages/DefeatPage";
import EndPage from "../pages/EndPage";

const appRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/jeu", element: <GamePage /> },
  { path: "/inventaire", element: <InventoryPage /> },
  { path: "/combat", element: <CombatPage /> },
  { path: "/victoire", element: <VictoryPage /> },
  { path: "/defaite", element: <DefeatPage /> },
  { path: "/fin", element: <EndPage /> },
];

export default appRoutes;
