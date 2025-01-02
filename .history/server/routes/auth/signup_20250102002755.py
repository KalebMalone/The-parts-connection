from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()  # Initialize bcrypt

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = bcrypt.generate_password_hash(data.get("password")).decode('utf-8')  # Ensure password hashing in your model
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id  # Set session with new user's ID

            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            print("User Data being returned:", user_data)  # Debugging log

            return make_response({"user": user_data}, 201)
        except IntegrityError:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)