from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr


class Base(DeclarativeBase):
    __abstract__ = True

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return f"{cls.__name__.lower()}s"

    id: Mapped[int] = mapped_column(primary_key=True)


class BaseEnum(Base):
    __abstract__ = True

    title: Mapped[str] = mapped_column(String(16), unique=True)
