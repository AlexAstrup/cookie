from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import crud
from database import SessionLocal, engine

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Define the FastAPI routes
@app.post("/items/", response_model=models.Item)
def create_item(name: str, description: str, db: Session = Depends(get_db)):
    item = models.Item(name=name, description=description)
    return crud.create_item(db=db, item=item)

@app.get("/items/{item_id}", response_model=models.Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@app.get("/items/", response_model=List[models.Item])
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@app.put("/items/{item_id}", response_model=models.Item)
def update_item(item_id: int, name: str, description: str, db: Session = Depends(get_db)):
    db_item = crud.update_item(db, item_id=item_id, name=name, description=description)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@app.delete("/items/{item_id}", response_model=bool)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    success = crud.delete_item(db, item_id=item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
    return success
