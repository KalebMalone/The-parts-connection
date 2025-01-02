from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            if not data.get("name"):
                return make_response({"error": "Name is required."}, 400)
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")  # Ensure password hashing in your model
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id  # Set session with new user's ID

            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            return make_response(user_data, 201)
        except IntegrityError as e:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
