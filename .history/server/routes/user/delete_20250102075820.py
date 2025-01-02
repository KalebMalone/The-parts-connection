from routes.__init__ import Resource, make_response, session, db
from models.user import User

class Delete(Resource):
    def delete(self):
        try:
            if "user_id" not in session:
                return make_response({"error": "User not logged in"}, 401)
            user_id = session["user_id"]
            user = User.query.get(user_id)
            if not user:
                return make_response({"error": "User not found"}, 404)
            db.session.delete(user)
            db.session.commit()
            session.pop("user_id", None)
            response = make_response({"message": "Account deleted successfully"}, 200)
            response.delete_cookie("session")

            return response

        except Exception as e:
            return make_response({"error": str(e)}, 422)