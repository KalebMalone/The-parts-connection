from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id

            # New users won't have any orders yet
            user_data = user.to_dict()
            user_data["orders"] = []

            return make_response(user_data, 201)
        except IntegrityError as e:
            return make_response({"error": str(e.orig)}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 422)
