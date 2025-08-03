from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

DATABASE_URL = "postgresql://alexander:mypassword@database:5432/mydb"
engine = create_engine(DATABASE_URL, pool_size=10, max_overflow=20)
Base = declarative_base()
