from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException, Request
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
from db_models import DBNfl_player, DBUser, DBRanking, DBTeam, DBPosition

DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/football"
engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)


# get all teams
def get_all_teams():
    db = sessionLocal()

    db_teams = db.query(DBTeam).order_by(DBTeam.id).all()
    teams = []
    for db_team in db_teams:
        teams.append(
            TeamOut(id=db_team.id, team_name=db_team.team_name, user_id=db_team.user_id)
        )
    db.close()
    return teams


# get user team
def get_team(team_id: int) -> TeamOut | None:
    db = sessionLocal()
    team = db.query(DBTeam).filter(DBTeam.id == team_id).first()
    db.close()
    return team


# get all nfl players
def get_all_nfl_players():
    db = sessionLocal()

    db_nfl_players = db.query(DBNfl_player).order_by(DBNfl_player.id).all()
    nfl_players = []
    for db_nfl_player in db_nfl_players:
        nfl_players.append(
            NflPlayerOut(
                id=db_nfl_player.id,
                player_name=db_nfl_player.player_name,
                position_id=db_nfl_player.position_id,
                team_id=db_nfl_player.team_id,
            )
        )
    db.close()
    return nfl_players


# get one nfl player
def get_player(nfl_player_id: int):
    db = sessionLocal()
    player = db.query(DBNfl_player).filter(DBNfl_player.id == nfl_player_id).first()
    db.close()
    return player


# get all rankings
def get_all_rankings():
    db = sessionLocal()

    db_rankings = db.query(DBRanking).order_by(DBRanking.id).all()
    rankings = []
    for db_ranking in db_rankings:
        rankings.append(RankingOut(id=db_ranking.id, team_id=db_ranking.team_id))
    db.close()
    return rankings


# find positions for certain players
def get_positions():
    db = sessionLocal()

    db_positions = db.query(DBPosition).order_by(DBPosition.id).all()
    positions = []
    for db_position in db_positions:
        positions.append(
            PositionOut(id=db_position.id, position_name=db_position.position_name)
        )
    db.close()
    return positions


# create player
def create_player(nfl_player: NflPlayerCreate):
    db = sessionLocal()

    player_model = DBNfl_player(**nfl_player.model_dump())

    db.add(player_model)
    db.commit()
    db.refresh(player_model)

    result = NflPlayerOut(
        id=player_model.id,
        player_name=player_model.player_name,
        position_id=player_model.position_id,
        team_id=player_model.team_id,
    )
    db.close()
    return result


# delete player (only if out for year)
def delete_player(nfl_player_id: int):
    db = sessionLocal()
    player = db.query(DBNfl_player).filter(DBNfl_player.id == nfl_player_id).first()
    if not player:
        db.close()
        raise HTTPException(status_code=404, detail="Player not found")
    db.delete(player)
    db.commit()
    db.close()
    return {"detail": f"Player with id {nfl_player_id} deleted successfully"}


# change players to different team


def change_player_team(nfl_player_id: int, new_team_id: int):
    db = sessionLocal()
    player = db.query(DBNfl_player).filter(DBNfl_player.id == nfl_player_id).first()
    if not player:
        db.close()
        raise HTTPException(status_code=404, detail="Player not found")
    player.team_id = new_team_id
    db.commit()
    db.refresh(player)
    result = NflPlayerOut(
        id=player.id,
        player_name=player.player_name,
        position_id=player.position_id,
        team_id=player.team_id,
    )
    db.close()
    return result
