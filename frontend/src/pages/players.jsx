import { useState, useEffect } from "react";
import { getPlayers, createPlayer } from "../../api";
import NewPlaya from "./addplayer";

export default function Players({ id, refreshTrigger }) {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);

    async function refreshPlayers() {
        try {
            const data = await getPlayers();
            if (data instanceof Error) {
                setError("Couldn't find players");
                return;
            }
            setPlayers(data);
        } catch (err) {
            setError("Failed to load players");
        }
    }

    useEffect(() => {
        refreshPlayers();
    }, [id, refreshTrigger]);

    async function newPlayer() {
        try {
            const created = await createPlayer();
            if (created instanceof Error) {
                setError("Couldn't create player");
                return;
            }
            // optional: refresh player list after creation
            refreshPlayers();
        } catch (err) {
            setError("Failed to create player");
        }
    }

    return (
        <div>
            <h1>Players Page</h1>
            {error && <h2 style={{ color: "red" }}>{error}</h2>}
            <button onClick={newPlayer}>Add New Player</button>

            <div className="player-list">
                {players.length > 0 ? (
                    players.map((p) => (
                        <div key={p.id}>
                            <h3>{p.player_name}</h3>
                            <p>Position ID: {p.position_id}</p>
                            <p>Team ID: {p.team_id}</p>
                        </div>
                    ))
                ) : (
                    <p>No players found.</p>
                )}
            </div>
        </div>
    );
}
