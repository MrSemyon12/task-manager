from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext

from core.config import settings


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_token(data: dict, refresh: bool = False) -> str:
    to_encode = data.copy()
    delta = (
        settings.auth.refresh_token_expire_minutes
        if refresh
        else settings.auth.access_token_expire_minutes
    )
    expire = datetime.utcnow() + timedelta(minutes=delta)

    to_encode.update({"exp": expire})
    secret_key = (
        settings.auth.refresh_secret_key if refresh else settings.auth.access_secret_key
    )
    encoded_jwt = jwt.encode(
        claims=to_encode,
        key=secret_key,
        algorithm=settings.auth.algorithm,
    )
    return encoded_jwt


def decode_token(token: str, refresh: bool = False) -> dict:
    secret_key = (
        settings.auth.refresh_secret_key if refresh else settings.auth.access_secret_key
    )
    return jwt.decode(
        token=token,
        key=secret_key,
        algorithms=[settings.auth.algorithm],
    )
