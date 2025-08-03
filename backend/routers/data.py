from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.models.bdt_signal import BdtSignalTrain
from backend.schemas.bdt_signal import BdtSignalTrainOut

router = APIRouter(prefix="/data", tags=["users"])


@router.options("/bdt")
async def options_data():
    return {"message": "CORS preflight allowed"}


@router.get(
    "/bdt",
    response_model=List[BdtSignalTrainOut],
    summary="Fetch all rows from test.BDT_signal_train",
)
def get_data(db: Session = Depends(get_db)):
    rows = (
        db
        .query(BdtSignalTrain.one, BdtSignalTrain.two, BdtSignalTrain.three)
        .all()
    )
    return rows
