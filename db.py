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
# get all rankings
# find positions for certain players
# create player
# delete player (only if out for year)
# change players to different team
