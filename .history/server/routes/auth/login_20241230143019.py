from routes.__init__ import Resource, request, db, make_response, session
from models.user import User

class Login(Resource):
    def post(self):
        try:
            data = request.json
            user = User.query.filter_by(email=data.get("email", "")).first()
            if user and user.authenticate(data.get("password", "")):  # Using the `authenticate` method
                session["user_id"] = user.id  # Store user ID in session

                # Fetch the user's orders
                orders = Order.query.filter_by(user_id=user.id).all()
                user_data = user.to_dict()
                user_data["orders"] = [order.to_dict() for order in orders]

                return make_response(user_data, 200)
            else:
                return make_response({"error": "Invalid Credentials"}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
