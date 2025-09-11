from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException, Request
from schemas import NflPlayerBase, UserBase, RankingBase, TeamBase, PositionBase
from db_models import DBNfl_player, DBUser, DBRanking, DBTeam, DBPosition

DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/football"
engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)

# get all teams
# get user team
# get all nfl players
# get one nfl player
# get all rankings
# find positions for certain players
# create player
# delete player (only if out for year)
# change players to different team
