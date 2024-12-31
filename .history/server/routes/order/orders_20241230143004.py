from flask_restful import Resource
from flask import make_response, session
from flask import session
from models.orders import Order
from models.user import User

class Orders(Resource):
    def get(self):
        try:
            # Retrieve user_id from session
            user_id = session.get("user_id")
            if not user_id:
                return {"error": "User is not logged in."}, 401

            # Fetch user information
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found."}, 404

            # Fetch orders for the logged-in user
            orders = Order.query.filter_by(user_id=user_id).all()

            # Serialize user and orders together
            user_data = user.to_dict()  # Assumes User model has a `to_dict` method
            user_data["orders"] = [order.to_dict() for order in orders]

            return make_response(user_data, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
