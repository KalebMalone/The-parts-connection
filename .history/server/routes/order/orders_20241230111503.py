from flask_restful import Resource
from flask import make_response, request, session  # Use session to get user_id (or JWT decoding)
from models.orders import Order
from models.user import User

class Orders(Resource):
    def get(self):
        try:
            # Assuming the user is logged in and the user_id is stored in the session or token
            user_id = session.get('user_id')  # Get the user_id from session (or decode from JWT token)

            # If user_id is not found in session, return a 401 error
            if not user_id:
                return make_response({"error": "User is not authenticated."}, 401)

            # Fetch orders for the authenticated user
            orders = Order.query.filter_by(user_id=user_id).all()

            # Serialize the orders
            serialized_orders = [order.to_dict() for order in orders]
            return make_response(serialized_orders, 200)

        except Exception as e:
            return make_response({"error": str(e)}, 500)
