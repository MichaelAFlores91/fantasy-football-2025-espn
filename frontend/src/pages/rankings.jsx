import { useState, useEffect } from "react";
import { getRankings } from "../../api";
import "./rankings.css";

export default function Rankings({ id, refreshTrigger }) {
  const [rankings, setRankings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshRankings() {
    try {
      setLoading(true);
      const data = await getRankings();
      if (!data || data instanceof Error) {
        setError("Couldn't find rankings");
        setRankings([]);
        return;
      }
      setRankings(data);
      setError(null);
    } catch (err) {
      setError("Failed to load rankings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshRankings();
  }, [id, refreshTrigger]);

  if (loading) return <p>Loading rankings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="rankings-container">
      <h1>Rankings</h1>

{rankings.length === 0 ? (
  <p>No rankings available.</p>
) : (
  <ul className="ranking-list">
    {rankings.map((r) => (
      <li key={r.id} className="ranking-item">
        <span className="ranking-position">ID: {r.id}</span>{" "}
        <span className="ranking-team">Team ID: {r.team_id}</span>
      </li>
    ))}
  </ul>
)}

    </div>
  );
}
