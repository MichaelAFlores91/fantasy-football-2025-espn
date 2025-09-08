from sqlalchemy import ForeignKey
from sqlalchemy.orm import declarative_base, mapped_column, Mapped


Base = declarative_base()


class DBUser(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"), nullable=False)


class DBTeam(Base):
    __tablename__ = "team"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    teamname: Mapped[str] = mapped_column(nullable=False, unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)


class DBNfl_player(Base):
    __tablename__ = "nfl_player"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    player_name: Mapped[str] = mapped_column(nullable=False, unique=True)
    position_id: Mapped[int] = mapped_column(ForeignKey("position.id"), nullable=False)
    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"), nullable=False)


class DBPosition(Base):
    __tablename__ = "position"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    position_name: Mapped[str] = mapped_column(nullable=False, unique=True)


class DBRanking(Base):
    __tablename__ = "ranking"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"), nullable=False)
