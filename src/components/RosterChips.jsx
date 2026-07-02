/**
 * RosterChips Component
 * Displays team members as interactive chips with toggle and remove actions
 */
const RosterChips = ({ roster, colorFor, removePerson, toggleActive }) => {
  /**
   * Escapes HTML special characters to prevent XSS attacks
   */
  const escapeHtml = (s) => {
    return s.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  };

  if (roster.length === 0) {
    return (
      <div className="chips">
        <div className="empty">Add some names to build the wheel.</div>
      </div>
    );
  }

  return (
    <div className="chips">
      {/* Render each team member as an interactive chip */}
      {roster.map((person, idx) => (
        <div key={person.id} className={`chip ${person.active ? "" : "skip"}`}>
          {/* Color indicator dot */}
          <span
            className="dotcolor"
            style={{ background: colorFor(idx) }}
          ></span>
          <span>{escapeHtml(person.name)}</span>
          {/* Toggle button - pauses person from rotation */}
          <button
            className="skiptoggle"
            onClick={() => toggleActive(person.id)}
            title="Toggle out today"
          >
            {person.active ? "⏸" : "▶"}
          </button>
          {/* Remove button - deletes person from roster */}
          <button
            onClick={() => removePerson(person.id)}
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default RosterChips;
