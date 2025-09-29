const baseURL = "http://localhost:8000";

//get_teams - /api/teams
export async function getTeams() {
    try {
        const response = await fetch(`${base}/api/teams`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching teams:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}
//get_team_by_id - /api/teams/{team_id}
export async function getTeamById(team_id) {
    try {
        const response = await fetch(`${baseURL}/api/teams/${team_id}`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching team by ID:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}
//get_players - /api/players
export async function getPlayers() {
    try {
        const response = await fetch(`${baseURL}/api/players`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching players:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}

//get_player_by_id - /api/players/{player_id}
export async function getPlayerById(player_id) {
    try {
        const response = await fetch(`${baseURL}/api/players/${player_id}`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching player by ID:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}

//get_rankings - /api/rankings
export async function getRankings() {
    try {
        const response = await fetch(`${baseURL}/api/rankings`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching rankings:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}

//get_all_positions - /api/positions
export async function getAllPositions() {
    try {
        const response = await fetch(`${baseURL}/api/positions`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching positions:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}

//add_player - /api/players
export async function createPlayer(new_player) {
    try {
        const response = await fetch(`${baseURL}/api/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_player),
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error creating player:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}
//remove_player - /api/players/{player_id}/team
export async function removePlayerFromTeam(player_id) {
    try {
        const response = await fetch(`${baseURL}/api/players/${player_id}/team`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return true;
    } catch (e) {
        console.error("Error removing player from team:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}

//update_player_team - /api/players/{player_id}/team
export async function updatePlayerTeam(player_id, new_team_id) {
    try {
        const response = await fetch(`${baseURL}/api/players/${player_id}/team`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ team_id: new_team_id }),
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error updating player team:", e);
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Unknown error occurred");
    }
}
