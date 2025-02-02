# crud.py
from sqlalchemy.orm import Session
import models


def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()

def get_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Item).offset(skip).limit(limit).all()

def create_item(db: Session, item: models.Item):
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_item(db: Session, item_id: int, name: str, description: str):
    db_item = get_item(db, item_id)
    if db_item:
        db_item.name = name
        db_item.description = description
        db.commit()
        db.refresh(db_item)
        return db_item
    return None

def delete_item(db: Session, item_id: int):
    db_item = get_item(db, item_id)
    if db_item:
        db.delete(db_item)
        db.commit()
        return True
    return False
