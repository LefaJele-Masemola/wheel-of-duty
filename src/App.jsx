import { useState, useEffect } from "react";
import "./App.css";
import Wheel from "./components/Wheel";
import RosterChips from "./components/RosterChips";

/**
 * Color palette for wheel segments and team member indicators
 * Each color is assigned to a team member (cycles if more than 10 people)
 */
const PALETTE = [
  "#FF6B81",
  "#FFD166",
  "#06D6A0",
  "#5FA8D3",
  "#A78BFA",
  "#F79256",
  "#4ECDC4",
  "#F25F5C",
  "#7BE495",
  "#C77DFF",
];

// Returns a color from palette for a given index
const colorFor = (idx) => PALETTE[idx % PALETTE.length];

/**
 * Main App Component - Wheel of Duty
 * Manages team roster, spin logic, and rotation history
 * Uses localStorage to persist data between sessions
 */
function App() {
  // Team roster with id, name, pick count, and active status
  const [roster, setRoster] = useState(() => {
    const saved = localStorage.getItem("roster");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Lefa", count: 0, active: true },
          { id: 2, name: "Roli", count: 0, active: true },
          { id: 3, name: "Asanda", count: 0, active: true },
          { id: 4, name: "Nthabiseng", count: 0, active: true },
        ];
  });

  // Track previous spin results for history display
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  // Wheel animation states
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [spinStatus, setSpinStatus] = useState("");
  const [newName, setNewName] = useState("");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [nextId, setNextId] = useState(() => {
    const saved = localStorage.getItem("nextId");
    return saved ? JSON.parse(saved) : 5;
  });

  // Persist data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("roster", JSON.stringify(roster));
  }, [roster]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("nextId", JSON.stringify(nextId));
  }, [nextId]);

  // Adds a new person to the roster
  const addPerson = () => {
    const name = newName.trim();
    if (!name) return;
    setRoster([...roster, { id: nextId, name, count: 0, active: true }]);
    setNextId(nextId + 1);
    setNewName("");
  };

  // Removes a person from the roster
  const removePerson = (id) => {
    setRoster(roster.filter((p) => p.id !== id));
  };

  // Toggles person's active status (skip this rotation)
  const toggleActive = (id) => {
    setRoster(
      roster.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  // Returns only active (non-skipped) team members
  const activePool = () => roster.filter((p) => p.active);

  const weights = (pool) => {
    const minCount = Math.min(...pool.map((p) => p.count));
    return pool.map((p) => 1 + (p.count - minCount === 0 ? 3 : 0));
  };

  /**
   * Calculates weighted random winner
   * People picked less have higher probability of being selected
   */
  const weightedWinner = () => {
    const pool = activePool();
    const w = weights(pool);
    const total = w.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < pool.length; i++) {
      r -= w[i];
      if (r <= 0) return pool[i];
    }
    return pool[pool.length - 1];
  };

  /**
   * Builds wheel segments for calculating rotation angles
   */
  const buildSegments = () => {
    const pool = activePool();
    if (pool.length === 0) return [];
    const w = weights(pool);
    const total = w.reduce((a, b) => a + b, 0);
    let cursor = 0;
    return pool.map((p, i) => {
      const idxInRoster = roster.findIndex((r) => r.id === p.id);
      const sweep = (w[i] / total) * 360;
      const seg = {
        person: p,
        start: cursor,
        end: cursor + sweep,
        color: colorFor(idxInRoster),
      };
      cursor += sweep;
      return seg;
    });
  };

  /**
   * Spins the wheel and selects a random winner
   * Applies weighted probability - people picked less get better odds
   */
  const spin = () => {
    if (spinning) return;
    const pool = activePool();
    if (pool.length < 2) {
      setSpinStatus(
        pool.length === 0
          ? "Add at least 2 people first"
          : "Add one more person to spin"
      );
      return;
    }

    setSpinning(true);
    setSpinStatus("spinning the wheel of destiny…");
    setWinner(null);

    const selectedWinner = weightedWinner();
    const segs = buildSegments();
    const winSeg = segs.find((s) => s.person.id === selectedWinner.id);
    
    // Calculate target angle for the winner
    if (winSeg) {
      const padding = (winSeg.end - winSeg.start) * 0.2;
      const targetAngle = winSeg.start + padding + Math.random() * ((winSeg.end - winSeg.start) - padding * 2);
      const extraSpins = 6 + Math.floor(Math.random() * 3);
      const finalRotation = wheelRotation - (wheelRotation % 360) + extraSpins * 360 - targetAngle;
      
      setWheelRotation(finalRotation);
    }

    // Complete spin after animation duration
    setTimeout(() => {
      setRoster(
        roster.map((p) =>
          p.id === selectedWinner.id ? { ...p, count: p.count + 1 } : p
        )
      );

      const today = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
      setHistory([{ name: selectedWinner.name, date: today }, ...history]);
      setWinner(selectedWinner);
      setSpinStatus("");
      setSpinning(false);

      burstConfetti();
    }, 3700);
  };

  const burstConfetti = () => {
    const layer = document.createElement("div");
    layer.className = "confetti";
    document.body.appendChild(layer);

    for (let i = 0; i < 70; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      piece.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
      piece.style.animationDelay = Math.random() * 0.4 + "s";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      layer.appendChild(piece);
    }

    setTimeout(() => layer.remove(), 4200);
  };

  return (
    <div className="wrap">
      <div className="eyebrow">
        <span className="dot"></span>
        ROTATION ROULETTE
      </div>
      <h1>🎡 Wheel of Duty</h1>
      <div className="sub">
        Add your crew, give it a spin, find out who's on morning watch today.
        Whoever's been picked least gets better odds.
      </div>

      <div className="panel">
        <h2>Who's playing</h2>
        <RosterChips
          roster={roster}
          colorFor={colorFor}
          removePerson={removePerson}
          toggleActive={toggleActive}
        />

        <div className="add-row">
          <input
            type="text"
            id="newName"
            placeholder="Add a name…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addPerson();
            }}
          />
          <button className="btn ghost" onClick={addPerson}>
            Add
          </button>
        </div>

        <Wheel
          roster={roster}
          colorFor={colorFor}
          spinning={spinning}
          activePool={activePool}
          weights={weights}
          rotation={wheelRotation}
        />

        <div style={{ textAlign: "center" }}>
          <button
            className="btn spin-btn"
            id="spinBtn"
            onClick={spin}
            disabled={spinning}
          >
            🎉 Spin it!
          </button>
          <div className="spin-status" id="spinStatus">
            {spinStatus}
          </div>
          {winner && (
            <div className="winner-banner show">
              👑 {winner.name} is on watch today!
            </div>
          )}
        </div>

        <div className="history" id="historyBox">
          {history.length > 0 && (
            <>
              <div style={{ marginBottom: "6px" }}>recent picks</div>
              {history.slice(0, 6).map((h, idx) => (
                <div key={idx} className="history-row">
                  <span>{h.name}</span>
                  <span>{h.date}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
