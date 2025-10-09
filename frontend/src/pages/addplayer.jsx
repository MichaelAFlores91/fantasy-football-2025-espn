import { useState } from "react";
import { createPlayer } from "../../api";
import { useParams } from "react-router-dom";
import Modal from "../modal";
import "../modal.css"

export default function newPlaya({onRefreshPlayers}) {
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {id} = useParams()

    async function submitPlayer(e) {
        e.preventDefault();
        const formPlayer = new FormData(e.target);

        const player = formPlayer.get("player")
        if(!player || typeof player !== "string") {
            setError("Invalid Player")
            return;
        }

        const addPlaya = await createPlayer(
            {player},
            id
        );
        if (addPlaya instanceof Error) {
            setError("Couldn't add player, please try again");
            return;
        }
        setIsModalOpen(false)
        onRefreshPlayers(addPlaya)
    }

    return (
        <div className="create-player">
            <button
            type="submit"
            onClick={() => setIsModalOpen(true)}
            className="a-button">
                Add a Player
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={submitPlayer} className="create=player-form">
                    <label className="player-label" htmlfor="playa">Player</label>
                    <p></p>
                    <textarea
                        className="textarea"
                        name="player-name"
                        id="player-id"
                        placeholder="Enter player name"
                        required={true}></textarea>
                    <p></p>
                    <button className="button-color" type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    )
}
