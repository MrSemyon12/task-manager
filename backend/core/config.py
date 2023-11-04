from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).parent.parent

DB_PATH = BASE_DIR / "db.sqlite3"


class DbSettings(BaseSettings):
    url: str = f"sqlite+aiosqlite:///{DB_PATH}"
    echo: bool = False


class AuthSettings(BaseSettings):
    token_url: str = "/api/v1/auth/login"

    algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    refresh_token_expire_minutes: int = 60 * 24
    access_secret_key: str = "secret_key"
    refresh_secret_key: str = "secret_key"

    model_config = SettingsConfigDict(env_file=".env")


class Settings(BaseSettings):
    api_v1_prefix: str = "/api/v1"
    manager_role_id: int = 1
    worker_role_id: int = 2

    db: DbSettings = DbSettings()
    auth: AuthSettings = AuthSettings()


settings = Settings()
