from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

try:
    from backend.database.connection import db
    from backend.models.user_model import UserModel, LoginModel
    from backend.utils.hash import (
        hash_password,
        verify_password
    )
    from backend.utils.token import create_access_token
except ImportError:
    from database.connection import db
    from models.user_model import UserModel, LoginModel
    from utils.hash import (
        hash_password,
        verify_password
    )
    from utils.token import create_access_token

router = APIRouter()

# SIGNUP
@router.post("/signup")
async def signup(user: UserModel):
    try:
        # Check if user already exists
        existing_user = db.users.find_one({
            "email": user.email
        })

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        # Hash password
        hashed = hash_password(user.password)

        # Create new user
        new_user = {
            "name": user.name,
            "email": user.email,
            "password": hashed
        }

        result = db.users.insert_one(new_user)

        return {
            "message": "User created successfully",
            "user_id": str(result.inserted_id)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Signup failed: {str(e)}"
        )

# LOGIN
@router.post("/login")
async def login(user: LoginModel):
    try:
        # Find user by email
        user_data = db.users.find_one({
            "email": user.email
        })

        if not user_data:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        # Verify password
        valid = verify_password(
            user.password,
            user_data["password"]
        )

        if not valid:
            raise HTTPException(
                status_code=401,
                detail="Wrong password"
            )

        # Create token
        token = create_access_token({
            "email": user_data["email"]
        })

        return {
            "token": token,
            "user": {
                "name": user_data["name"],
                "email": user_data["email"]
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Login failed: {str(e)}"
        )