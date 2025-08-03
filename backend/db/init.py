from backend.db.core import Base, engine
from backend import models  # registers all models

def init_db():
    Base.metadata.create_all(bind=engine)
