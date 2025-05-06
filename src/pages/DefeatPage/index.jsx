import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./index.scss";

const DefeatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // On purge tout le localStorage, tu t'es fait éclater 💀
    localStorage.clear();
  }, []);

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <h1>Il faut Sauver Gronnella</h1>
      <h2>💀 Défaite 💀</h2>

      <div className="defeat">
        <p>
          Vous êtes vaincu. Vos ennemis rient encore de votre chute héroïque…
        </p>
        <p>Mais tout n'est pas perdu. Vous pouvez retenter votre chance !</p>
      </div>

      <button className="action-button" onClick={handleReturn}>
          Recommencer l'aventure
        </button>
    </>
  );
};

export default DefeatPage;
