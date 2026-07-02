import { useEffect, useRef, useState } from "react";

/**
 * Wheel Component
 * Renders an interactive spinning wheel for team duty rotation
 * Displays colored segments for each team member
 */
const Wheel = ({ roster, colorFor, spinning, activePool, weights, rotation = 0 }) => {
  const svgRef = useRef(null);
  const wheelOuter = useRef(null);

  /**
   * Converts degrees to polar coordinates on the wheel
   * @param {number} cx - Center X coordinate
   * @param {number} cy - Center Y coordinate
   * @param {number} r - Radius
   * @param {number} thetaDeg - Angle in degrees
   * @returns {Object} {x, y} coordinates
   */
  const polar = (cx, cy, r, thetaDeg) => {
    const a = ((thetaDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  // Builds wheel segments with start/end angles for each team member
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

  // Renders the SVG wheel with colored segments and names
  const drawWheel = () => {
    const segs = buildSegments();
    const cx = 150,
      cy = 150,
      r = 145;

    if (!svgRef.current) return;

    if (segs.length === 0) {
      svgRef.current.innerHTML = `
        <circle cx="150" cy="150" r="145" fill="#17233B" stroke="#223052" stroke-width="2"/>
        <text x="150" y="155" text-anchor="middle" fill="#8896B3" font-size="14" font-family="ui-monospace,monospace">add names</text>
      `;
      return;
    }

    let parts = "";
    segs.forEach((seg) => {
      const p1 = polar(cx, cy, r, seg.start);
      const p2 = polar(cx, cy, r, seg.end);
      const largeArc = seg.end - seg.start > 180 ? 1 : 0;
      parts += `<path d="M${cx},${cy} L${p1.x.toFixed(
        2
      )},${p1.y.toFixed(2)} A${r},${r} 0 ${largeArc} 1 ${p2.x.toFixed(
        2
      )},${p2.y.toFixed(
        2
      )} Z" fill="${seg.color}" stroke="#0B1220" stroke-width="2"/>`;

      const mid = (seg.start + seg.end) / 2;
      const labelPos = polar(cx, cy, r * 0.62, mid);
      const fontSize =
        segs.length > 7 ? 10 : segs.length > 4 ? 12.5 : 14.5;
      parts += `<text x="${labelPos.x.toFixed(
        2
      )}" y="${labelPos.y.toFixed(
        2
      )}" text-anchor="middle" dominant-baseline="middle" fill="#0B1220" font-weight="700" font-size="${fontSize}" font-family="-apple-system,Segoe UI,sans-serif">${seg.person.name}</text>`;
    });

    svgRef.current.innerHTML = parts;
    svgRef.current._segs = segs;
  };

  useEffect(() => {
    drawWheel();
  }, [roster, activePool, weights]);

  return (
    <div className="wheel-zone">
      <div className="pointer"></div>
      <div className="wheel-outer" ref={wheelOuter}>
        <svg
          ref={svgRef}
          id="wheelSvg"
          viewBox="0 0 300 300"
          width="280"
          height="280"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 3.6s cubic-bezier(0.13, 0.79, 0.09, 1)" : "none",
          }}
        ></svg>
      </div>
      <div className="hub">🎯</div>
    </div>
  );
};

export default Wheel;
