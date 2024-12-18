from models.user import User
from models.__init__ import db, Resource, request
from routes.__init__ import session, make_response

class EditUser(Resource):
    def patch(self):
        try:
            print("Session contents:", session)  # Debug session data
            if "user_id" not in session:
                return make_response({"error": "Unauthorized access"}, 401)

            user_id = session["user_id"]
            print("User ID from session:", user_id)  # Debug user ID
            user = User.query.get(user_id)
            print("User from database:", user)  # Debug user object

            if not user:
                return make_response({"error": "User not found"}, 404)

            data = request.get_json()
            print("Data received:", data)  # Debug incoming data

            if "name" in data and data["name"]:
                user.name = data["name"]
            if "email" in data and data["email"]:
                user.email = data["email"]
            if "password" in data and data["password"]:
                user.password = data["password"]  # Hash this in production

            db.session.commit()
            print("User updated successfully")  # Confirm commit
            return make_response(user.to_dict(), 200)

        except Exception as e:
            print("Error occurred:", e)  # Debug exception
            return make_response({"error": str(e)}, 422)
