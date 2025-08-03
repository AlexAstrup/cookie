from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.db.core import engine, Base
from backend.db.init import init_db
from backend.db.session import SessionLocal
from backend.seed import create_default_admin
from backend.routers import data, user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_db()
    create_default_admin()


app.include_router(user.router)
app.include_router(data.router)
