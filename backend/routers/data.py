from typing import List, Tuple, Dict, Any
import pandas as pd

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text, inspect, MetaData, Table, inspect, select

from backend.dependencies import get_db
from backend.models.bdt_signal import BdtSignalTrain
from backend.schemas.bdt_signal import BdtSignalTrainOut
from backend.utils.data import fetch_validated_table
from pydantic import create_model, BaseModel

router = APIRouter(prefix="/data", tags=["data"])


@router.get(
    "/tables/{schema_name}",
    summary="List all tables in a given schema",
    response_model=List[str],
)
def list_tables(schema_name: str, db: Session = Depends(get_db)):
    try:
        inspector = inspect(db.bind)
        tables = inspector.get_table_names(schema=schema_name)
        return tables
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/{schema_name}/{table_name}")
def get_table_data(schema_name: str, table_name: str, db: Session = Depends(get_db)):
    try:
        return fetch_validated_table(schema_name, table_name, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

# Legacy
@router.get(
    "/bdt",
    response_model=List[BdtSignalTrainOut],
    summary="Fetch all rows from test.bdt_signal_train",
)
def get_data(db: Session = Depends(get_db)):
    return db.query(BdtSignalTrain).all()
