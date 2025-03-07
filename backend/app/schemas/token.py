from pydantic import BaseModel
from ..schemas import user as UserSchema

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(Token):
    user: UserSchema.User