from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"]
)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="mydb",
    user="alexander",
    password="mypassword",
    host="database",
    port="5432"
)


@app.options("/data")
async def options_data():
    return {"message": "CORS preflight allowed"}


@app.get("/data")
def get_data():
    cursor = conn.cursor()
    cursor.execute("SELECT one, two, three FROM test.BDT_signal_train")
    rows = cursor.fetchall()
    cursor.close()
    return JSONResponse(content=json.dumps(rows))
