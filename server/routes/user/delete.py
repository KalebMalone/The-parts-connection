from routes.__init__ import Resource, make_response, session, db
from models.user import User

class Delete(Resource):
    def delete(self):
        try:
            print("Session contents:", session)  # Debug session data
            if "user_id" not in session:
                return make_response({"error": "User not logged in"}, 401)

            user_id = session["user_id"]
            print("User ID from session:", user_id)  # Debug user ID
            user = User.query.get(user_id)

            if not user:
                return make_response({"error": "User not found"}, 404)

            db.session.delete(user)
            db.session.commit()
            session.pop("user_id", None)

            response = make_response({"message": "Account deleted successfully"}, 200)
            response.set_cookie("session", "", expires=0)
            return response

        except Exception as e:
            print("Error occurred:", e)  # Debug exception
            return make_response({"error": str(e)}, 422)
