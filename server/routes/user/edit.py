from routes.__init__ import Resource, make_response, session, request
from models.user import User

class EditUser(Resource):
    def patch(self):
        try:
            if "user_id" in session:
                user = User.query.get(session["user_id"])
                if user:
                    user_data = request.get_json()
                    user.name = user_data.get("name", user.name)
                    user.save()
                    return make_response(user.to_dict(), 200)
                return {"error": "User not found"}, 404
            return {"error": "Not authenticated"}, 401
        except Exception as e:
            return {"error": str(e)}, 500