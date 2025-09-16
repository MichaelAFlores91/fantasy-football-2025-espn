from pydantic import BaseModel


class UserBase(BaseModel):
    username: str


class TeamBase(BaseModel):
    team_name: str
    user_id: int


class PositionBase(BaseModel):
    position_name: str


class NflPlayerBase(BaseModel):
    player_name: str
    position_id: int
    team_id: int


class RankingBase(BaseModel):
    team_id: int


class TeamOut(TeamBase):
    id: int


class NflPlayerOut(NflPlayerBase):
    id: int


class RankingOut(RankingBase):
    id: int


class PositionOut(PositionBase):
    id: int


class NflPlayerCreate(NflPlayerBase):
    pass
