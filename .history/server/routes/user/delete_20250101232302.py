from flask_restful import Resource
from flask import make_response, session
from models.user import User
from models.__init__ import db
class Delete(Resource):
    def delete(self):
        try:
            # Check if the user is logged in
            if "user_id" not in session:
                return make_response({"error": "User not logged in"}, 401)
            user_id = session["user_id"]
            # Retrieve the user from the database
            user = User.query.get(user_id)
            if not user:
                return make_response({"error": "User not found"}, 404)
            # Delete the user from the database
            db.session.delete(user)
            db.session.commit()
            # Clear session and cookies
            session.pop("user_id", None)  # Remove the user_id from session
            response = make_response({"message": "Account deleted successfully"}, 200)
            response.delete_cookie("session")  # Assuming the session cookie is named "session"

            return response

        except Exception as e:
            return make_response({"error": str(e)}, 422)
