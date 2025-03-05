from fastapi import FastAPI
from .routers import auth, post
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(post.router)

@app.get("/")
async def root():
    return {"message": "Blogi API is running"}
