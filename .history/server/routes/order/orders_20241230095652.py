from flask_restful import Resource
from flask import make_response, request
from models.orders import Order
from models.user import User

class Orders(Resource):
    def get(self):
        try:
            # Retrieve the user ID from the request (assuming it's passed in the headers or query)
            user_id = request.args.get('user_id')  # Get user ID from the query parameters

            # If user_id is not provided or is invalid, return a 400 error
            if not user_id:
                return make_response({"error": "User ID is required."}, 400)

            # Fetch orders only for the specified user_id
            orders = Order.query.filter_by(user_id=user_id).all()

            # Serialize the orders
            serialized_orders = [order.to_dict() for order in orders]
            return make_response(serialized_orders, 200)

        except Exception as e:
            return make_response({"error": str(e)}, 500)
