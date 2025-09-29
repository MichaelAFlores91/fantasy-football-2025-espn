from fastapi import FastAPI, HTTPException, Request
from db import (
    get_all_teams,
    get_team,
    get_all_nfl_players,
    get_player,
    get_all_rankings,
    get_positions,
    create_player,
    delete_player,
    change_player_team,
)

from schemas import (
    NflPlayerBase,
    UserBase,
    RankingBase,
    TeamBase,
    PositionBase,
    TeamOut,
    NflPlayerOut,
    RankingOut,
    PositionOut,
    NflPlayerCreate,
)

app = FastAPI()

origins = ["http://127.0.0.1:5173", "http://localhost:5173"]


@app.get("/api/teams")
async def get_teams() -> list[TeamOut]:
    return get_all_teams()


@app.get("/api/teams/{team_id}")
async def get_team_by_id(team_id: int) -> TeamOut:
    team = get_team(team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


@app.get("/api/players")
async def get_players() -> list[NflPlayerOut]:
    return get_all_nfl_players()


@app.get("/api/players/{player_id}")
async def get_player_by_id(player_id: int) -> NflPlayerOut:
    player = get_player(player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player


@app.get("/api/rankings")
async def get_rankings() -> list[RankingOut]:
    return get_all_rankings()


@app.get("/api/positions")
async def get_all_positions() -> list[PositionOut]:
    return get_positions()


@app.post("/api/players", status_code=201)
async def add_player(player: NflPlayerCreate) -> NflPlayerOut:
    return create_player(player)


@app.delete("/api/players/{player_id}", status_code=204)
async def remove_player(player_id: int) -> None:
    if not delete_player(player_id):
        raise HTTPException(status_code=404, detail="Player not found")
    return None


@app.patch("/api/players/{player_id}/team", status_code=200)
async def update_player_team(player_id: int, team: TeamBase) -> NflPlayerOut:
    updated_player = change_player_team(player_id, team)
    if not updated_player:
        raise HTTPException(status_code=404, detail="Player or Team not found")
    return updated_player
