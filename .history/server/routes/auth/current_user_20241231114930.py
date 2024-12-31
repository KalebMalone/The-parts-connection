from flask_restful import Resource
from flask import session, make_response
from models.user import User

class CurrentUser(Resource):
    def get(self):
        try:
            user_id = session.get("user_id")
            import ipdb; ipdb 
            if not user_id:
                return make_response({"error": "User is not logged in."}, 401)

            user = User.query.get(user_id)
            if not user:
                return make_response({"error": "User not found."}, 404)

            return make_response(user.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
