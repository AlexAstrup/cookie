from typing import List, Tuple

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from backend.dependencies import get_db
from backend.models.bdt_signal import BdtSignalTrain
from backend.schemas.bdt_signal import BdtSignalTrainOut

router = APIRouter(prefix="/data", tags=["data"])


@router.options("/bdt")
async def options_data():
    return {"message": "CORS preflight allowed"}


@router.get(
    "/bdt",
    response_model=List[BdtSignalTrainOut],
    summary="Fetch all rows from test.bdt_signal_train",
)
def get_data(db: Session = Depends(get_db)):
    return db.query(BdtSignalTrain).all()
