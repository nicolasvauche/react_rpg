import "./index.scss";

const QuestStep = ({ quest }) => {
  if (!quest) {
    return <p>Aucune quête active pour le moment.</p>;
  }

  return (
    <div className="quest-card">
      <h3>{quest.title}</h3>

      <p dangerouslySetInnerHTML={{ __html: quest.description }}></p>
      
      <h3>Votre Objectif :</h3>
        <p dangerouslySetInnerHTML={{ __html: quest.objective }}></p>
    </div>
  );
};

export default QuestStep;
