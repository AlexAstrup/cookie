from pydantic import BaseModel

class BdtSignalTrainOut(BaseModel):
    one: float
    two: float
    three: float

    class Config:
        orm_mode = True
