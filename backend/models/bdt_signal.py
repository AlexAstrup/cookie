from sqlalchemy import Column, Integer, Float
from backend.db.core import Base

class BdtSignalTrain(Base):
    __tablename__  = "BDT_signal_train"
    __table_args__ = {"schema": "test"}

    id    = Column(Integer, primary_key=True, index=True)
    one   = Column(Float, nullable=False)
    two   = Column(Float, nullable=False)
    three = Column(Float, nullable=False)
