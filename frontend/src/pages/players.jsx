import { useState, useEffect } from "react"
import { getPlayers } from "../../api"
import { getPlayerById } from "../../api"
import { createPlayer } from "../../api"
import { removePlayerFromTeam } from "../../api"
import { updatePlayerTeam } from "../../api"


export default function Players(id, refreshTrigger) {
    const [error, setError] = useState(null)
    const [player, setPlayer] = useState([])
    const [newPlay, setNewPlay] = useState([])

    async function refreshPlayers() {
        try {
            const player = await getPlayers(id);
            if (player instanceof Error){
                setError("Couldn't find players");
                return;
            }
            setPlayer(player);
        } catch (error) {
            setError("Failed to load players")
        }
    }

    useEffect(() => {
        refreshPlayers();
    }, [id, refreshTrigger])

    async function newPlayer() {
        try {
            const newPlay = await createPlayer();
            if (newPlay instanceof Error){
                setError("Couldn't create player");
                return;
            }
            setNewPlay(newPlay);
        } catch (error) {
            setError("Failed to load new player")
        }
    }





    return (
        <div>
            <h1>Players Page</h1>
            <p>This is the players page content.</p>
        <button onClick={newPlayer}>add new player</button>



        </div>
    )
}
