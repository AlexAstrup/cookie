from backend.db.session import SessionLocal
from backend.models.user import User
from backend.utils.auth import get_password_hash

def create_default_admin():
    db = SessionLocal()
    try:
        if not db.query(User).filter_by(username="admin").first():
            admin = User(
                username="admin",
                hashed_password=get_password_hash("admin123")
            )
            db.add(admin)
            db.commit()
            print("✅ Created default admin user: admin / admin123")
        else:
            print("ℹ️ Admin user already exists.")
    finally:
        db.close()
