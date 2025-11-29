import { useState } from "react";
import { createPlayer } from "../../api";
import { useParams } from "react-router-dom";
import Modal from "../modal";
import "../modal.css";

export default function NewPlaya({ onRefreshPlayers }) {
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();

    // separate states for selects
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");

    async function submitPlayer(e) {
        e.preventDefault();
        const formPlayer = new FormData(e.target);

        const playerName = formPlayer.get("player-name");
        if (!playerName || typeof playerName !== "string") {
            setError("Invalid player name");
            return;
        }

        const newPlayerData = {
            player_name: playerName,
            position_id: selectedPosition,
            team_id: selectedTeam,
        };

        try {
            const addPlaya = await createPlayer(newPlayerData, id);
            if (addPlaya instanceof Error) {
                setError("Couldn't add player, please try again");
                return;
            }
            setIsModalOpen(false);
            onRefreshPlayers(addPlaya);
        } catch (err) {
            setError("Failed to add player");
        }
    }

    return (
        <div className="create-player">
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="a-button"
            >
                Add a Player
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={submitPlayer} className="create-player-form">
                    <label className="player-label" htmlFor="player-id">Player</label>
                    <p></p>
                    <textarea
                        className="textarea"
                        name="player-name"
                        id="player-id"
                        placeholder="Enter player name"
                        required
                    ></textarea>
                    <p></p>

                    <select
                        id="position-select"
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                    >
                        <option value="">Choose a position</option>
                        <option value="1">Quarterback</option>
                        <option value="2">Running Back</option>
                        <option value="3">Wide Receiver</option>
                        <option value="4">Tight End</option>
                        <option value="5">Kicker</option>
                        <option value="6">Defense</option>
                        <option value="7">Flex</option>
                        <option value="8">Superflex</option>
                        <option value="9">Bench</option>
                        <option value="10">Injured Reserve</option>
                        <option value="11">Free Agent</option>
                    </select>

                    <select
                        id="team-select"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                    >
                        <option value="">Choose a team</option>
                        <option value="1">Team1</option>
                        <option value="2">Team2</option>
                        <option value="3">Team3</option>
                        <option value="4">Team4</option>
                        <option value="5">Team5</option>
                        <option value="6">Team6</option>
                        <option value="7">Team7</option>
                        <option value="8">Team8</option>
                        <option value="9">Team9</option>
                        <option value="10">Team10</option>
                        <option value="11">Team11</option>
                        <option value="12">Team12</option>
                    </select>

                    {error && <p className="error">{error}</p>}

                    <button className="button-color" type="submit">
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    );
}
