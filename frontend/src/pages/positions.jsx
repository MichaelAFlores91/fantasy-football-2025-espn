import { useState, useEffect } from "react"
import { getAllPositions } from "../../api"
import "./positions.css";

export default function Positions({id, refreshTrigger }) {
    const [positions, setPositions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshPositions() {
        try {
            setLoading(true);
            const data = await getAllPositions();
            if (!data || data instanceof Error) {
                setError("Couldn't find positions");
                setPositions([]);
                return;
            }
            setPositions(data);
            setError(null);
        } catch (err) {
            setError("Failed to load Positions");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshPositions();
    }, [id, refreshTrigger]);

      if (loading) return <p>Loading positions...</p>;
      if (error) return <p className="error">{error}</p>;

  return (
    <div className="positions-container">
      <h1>Positions</h1>

      {positions.length === 0 ? (
        <p>No positions available.</p>
      ) : (
        <ul className="positions-list">
          {positions.map((pos) => (
            <li key={pos.id} className="position-item">
              <span className="position-id">#{pos.id}</span>{" "}
              <span className="position-name">{pos.position_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
