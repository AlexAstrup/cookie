from pydantic import BaseModel

class TrainRequest(BaseModel):
    schema_name: str
    table_name: str
    target_column: str
    params: dict = {}
