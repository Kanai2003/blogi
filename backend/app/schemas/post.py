from pydantic import BaseModel
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str

class Post(PostBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PostCreate(PostBase):
    pass