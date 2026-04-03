from pydantic import BaseModel

class BdtSignalTrainOut(BaseModel):
    one: float
    two: float
    three: float

    class Config:
        orm_mode = True

class BdtSignalTestOut(BaseModel):
    one: float
    two: float
    three: float

    class Config:
        orm_mode = True

class BdtBackgroundTrainOut(BaseModel):
    one: float
    two: float
    three: float

    class Config:
        orm_mode = True

class BdtBackgroundTestOut(BaseModel):
    one: float
    two: float
    three: float

    class Config:
        orm_mode = True
