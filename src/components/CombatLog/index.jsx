import { useEffect, useRef } from "react";
import "./index.scss";

const CombatLog = ({ logs }) => {
  const logContainerRef = useRef(null);

  useEffect(() => {
    const el = logContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="combat-log" ref={logContainerRef}>
      <h2>Journal du combat</h2>
      <ul>
        {logs.map((log, index) => {
          const text = typeof log === "string" ? log : log.text;
          const isCrit = typeof log === "object" && log.isCrit;
          return (
            <li key={index} className={isCrit ? "crit" : ""}>
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CombatLog;
