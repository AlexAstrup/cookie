from sqlalchemy import text, inspect, MetaData, Table, inspect, select
from pydantic import create_model
from sqlalchemy.orm import Session
from typing import List, Dict, Any


def fetch_validated_table(schema_name: str, table_name: str, db: Session) -> List[Dict[str, Any]]:
    # Reflect the table
    metadata = MetaData(schema=schema_name)
    table = Table(table_name, metadata, autoload_with=db.bind)

    # Fetch rows
    result = db.execute(select(table)).fetchall()
    rows = [dict(row._mapping) for row in result]

    # Dynamically create Pydantic model
    fields = {
        col.name: (col.type.python_type, ...)
        for col in table.columns
    }
    DynamicModel = create_model(f"{table_name}_Model", **fields)

    # Validate each row
    validated = [DynamicModel(**row).dict() for row in rows]
    return validated
