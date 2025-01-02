from models.user import User
from models.__init__ import db, Resource, request
from routes.__init__ import session, make_response

class EditUser(Resource):
    def patch(self):
        try:
            if "user_id" not in session:
                return make_response({"error": "Unauthorized access"}, 401)

            user_id = session["user_id"]
            user = User.query.get(user_id)
            if not user:
                return make_response({"error": "User not found"}, 404)
            data = request.get_json()
            if data["name"]:
                user.name = data["name"]
            if data["email"]:
                user.email = data["email"]
            if data["password"]:
                user.password = data["password"

            # Commit changes to the database
            db.session.commit()

            # Return the updated user
            return make_response(user.to_dict(), 200)

        except Exception as e:
            # Handle unexpected errors
            return make_response({"error": str(e)}, 422)