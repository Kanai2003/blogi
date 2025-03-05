from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import database
from ..models import user as UserModel
from ..utils import util
from ..schemas import user as UserSchema, token as TokenSchema

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserSchema.User)
def register_user(user: UserSchema.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(UserModel.User).filter(UserModel.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = util.get_password_hash(user.password)
    db_user = UserModel.User(username=user.username, name=user.name , hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/token", response_model= TokenSchema.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(UserModel.User).filter(UserModel.User.username == form_data.username).first()
    if not user or not util.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token = util.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
