from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text, inspect, MetaData, Table, inspect

from backend.dependencies import get_db
from backend.schemas.inference import TrainRequest
from backend.utils.data import fetch_validated_table
from backend.services.model import train_model_from_df
from pydantic import create_model, BaseModel

import pandas as pd
from sklearn.linear_model import Ridge

router = APIRouter(prefix="/abm", tags=["abm"])


@router.post("/train")
def train_endpoint(req: TrainRequest, db: Session = Depends(get_db)):
    try:
        # Fetch and validate table data
        validated_rows = fetch_validated_table(req.schema_name, req.table_name, db)

        # Convert to DataFrame
        df = pd.DataFrame(validated_rows)

        # Train the model
        model, metrics = train_model_from_df(df, req.target_column, req.params)

        return {
            "metrics": metrics,
            "message": f"Model trained on {req.table_name} with target '{req.target_column}'"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error training model: {str(e)}")


@router.post("/predict", summary="Predict using inference model")
def predict(data):
    try:
        return {"success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error predicting: {str(e)}")

@router.get("/options")
def options():
    try:
        return {"options": ["option1", "option2"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting options: {str(e)}")