from routes.__init__ import Resource, make_response, session
from models.user import User

class GetUser(Resource):
    def get(self):
        try:
            if "user_id" in session:
                user = User.query.get(session["user_id"])
                if user:
                    return make_response(user.to_dict(), 200)
                return {"error": "User not found"}, 404
            return {"error": "Not authenticated"}, 401
        except Exception as e:
            return {"error": str(e)}, 500