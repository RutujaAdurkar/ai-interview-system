from backend.database.connection import db

def save_interview(data):

    db.interviews.insert_one(data)