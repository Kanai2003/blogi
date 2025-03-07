from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from .. import database
from ..models import user as UserModel, post as PostModel
from ..utils import util
from ..schemas import post as PostSchema

router = APIRouter(prefix="/posts", tags=["posts"])

def get_current_user(token: str = Header(None), dp: Session = Depends(database.get_db)):
  if not token:
    raise HTTPException(status_code=401, detail="Unauthorized")
  payload = util.decode_access_token(token)
  if not payload:
    raise HTTPException(status_code=401, detail="Invalid token")
  user = dp.query(UserModel.User).filter(UserModel.User.username == payload.get("sub")).first()
  if not user:
    raise HTTPException(status_code=401, detail="User not found")
  return user


@router.get("/{owner_id}")
def read_my_posts(owner_id:int, db: Session = Depends(database.get_db)):
    posts = db.query(PostModel.Post).filter(PostModel.Post.owner_id == owner_id).order_by(PostModel.Post.created_at.desc()).all()
    return posts

@router.post("/", response_model=PostSchema.Post)
def create_post(post: PostSchema.PostCreate, current_user: UserModel.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
  db_post = PostModel.Post(title=post.title, content=post.content, owner_id=current_user.id)
  db.add(db_post)
  db.commit()
  db.refresh(db_post)
  return db_post

@router.get("/{post_id}/{owner_id}", response_model=PostSchema.Post)
def read_post(post_id: int, owner_id:int,  db: Session = Depends(database.get_db)):
  db_post = db.query(PostModel.Post).filter(PostModel.Post.id == post_id, PostModel.Post.owner_id == owner_id).first()
  if not db_post:
    raise HTTPException(status_code=404, detail="Post not found")
  return db_post

@router.put("/{post_id}", response_model=PostSchema.Post)
def update_post(post_id: int, post: PostSchema.PostCreate, current_user: UserModel.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
  db_post = db.query(PostModel.Post).filter(PostModel.Post.id == post_id, PostModel.Post.owner_id == current_user.id).first()
  if not db_post:
    raise HTTPException(status_code=404, detail="Post not found")
  # if db_post.owner_id != current_user.id:
  #   raise HTTPException(status_code=403, detail="Forbidden")
  db_post.title = post.title
  db_post.content = post.content
  db.commit()
  db.refresh(db_post)
  return db_post

@router.delete("/{post_id}")
def delete_post(post_id: int, current_user: UserModel.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
  db_post = db.query(PostModel.Post).filter(PostModel.Post.id == post_id, PostModel.Post.owner_id == current_user.id).first()
  if not db_post:
    raise HTTPException(status_code=404, detail="Post not found")
  # if db_post.owner_id != current_user.id:
  #   raise HTTPException(status_code=403, detail="Forbidden")
  db.delete(db_post)
  db.commit()
  return {"message": "Post deleted successfully"}

@router.get("/")
def read_all_posts(db: Session = Depends(database.get_db), limit: int = 10, page: int = 1):
  offset = (page - 1) * limit
  posts = db.query(PostModel.Post).join(UserModel.User).order_by(PostModel.Post.created_at.desc()).offset(offset).limit(limit).all()
  return [
    {
      "id": post.id,
      "title": post.title,
      "content": post.content,
      "created_at": post.created_at,
      "updated_at": post.updated_at,
      "owner": {
        "id": post.owner.id,
        "username": post.owner.username,
        "name": post.owner.name
      }
    } for post in posts
  ]
