from flask import request, session, make_response
from flask_restful import Resource
from models.user import User
from models.orders import Order

class Login(Resource):
    def post(self):
        try:
            data = request.json
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return make_response({"error": "Email and password are required."}, 400)

            user = User.query.filter_by(email=email).first()
            if user and user.authenticate(password):  # Ensure the `authenticate` method exists
                session["user_id"] = user.id

                # Fetch orders for the user
                orders = Order.query.filter_by(user_id=user.id).all()
                user_data = user.to_dict()
                user_data["orders"] = [order.to_dict() for order in orders]

                return make_response({"message": "Login successful", "user": user_data}, 200)

            return make_response({"error": "Invalid credentials."}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
