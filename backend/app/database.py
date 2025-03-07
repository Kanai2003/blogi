from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
import os
import time

DATABASE_URL = os.environ.get("DATABASE_URL")

MAX_RETRIES = 10
RETRY_DELAY = 2 

retries = 0
engine = None  

while retries < MAX_RETRIES:
    try:
        engine = create_engine(DATABASE_URL)
        engine.connect()
        print("Database connection successful!")
        break 
    except OperationalError:
        retries += 1
        print(f"Database not ready. Retrying in {RETRY_DELAY} seconds... (Attempt {retries}/{MAX_RETRIES})")
        time.sleep(RETRY_DELAY)

if engine is None:  
    print("Failed to connect to the database after multiple retries. Exiting.")
    exit(1)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()