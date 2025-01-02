from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()  # Initialize bcrypt

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            # Ensure password is set via the setter to handle validation and hashing
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")  # Uses the setter to hash the password
            db.session.add(user)
            db.session.commit()

            # Set session with new user's ID
            session["user_id"] = user.id

            # Returning user data without the password hash
            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            return make_response(user_data, 201)
        except IntegrityError as e:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
