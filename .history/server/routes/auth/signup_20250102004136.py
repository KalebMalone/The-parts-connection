from flask_restful import Resource, request
from flask import make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
from flask_mail import Message
from config import mail
from jinja2 import Template
import datetime
from config import db

bcrypt = Bcrypt()

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            password = data.get("password")
            
            # Debugging password length
            print(f"Received password: {password} (Length: {len(password)})")  # Log password length

            # Check password length before proceeding
            if not password or not (10 <= len(password) <= 20):
                return make_response({"error": "Password must be between 10 and 20 characters long"}, 400)

            user = User(email=data.get("email"), name=data.get("name"))
            user.password = bcrypt.generate_password_hash(password).decode("utf-8")
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id  # Set session with new user's ID

            # Send welcome email
            self.send_welcome_email(user)

            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            return make_response({"user": user_data}, 201)
        except IntegrityError as e:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            print("Error:", e)  # Log the error for debugging
            return make_response({"error": str(e)}, 400)
