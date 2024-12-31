from flask_restful import Resource
from flask import make_response
from models.orders import Order
from models.user import User  # Import if necessary for your relationships

class Orders(Resource):
    def get(self):
        try:
            # Fetch all orders without checking authentication
            orders = Order.query.all()  # Fetch orders for all users, not just authenticated ones

            # Serialize the orders
            serialized_orders = [order.to_dict() for order in orders]
            return make_response(serialized_orders, 200)

        except Exception as e:
            return make_response({"error": str(e)}, 500)
