from flask_restful import Resource
from flask import session
from models.orders import Order

class Orders(Resource):
    def get(self):
        try:
            # Retrieve user_id from session
            user_id = session.get("user_id")
            if not user_id:
                return {"error": "User is not logged in."}, 401

            # Fetch orders for the logged-in user
            orders = Order.query.filter_by(user_id=user_id).all()

            # Serialize the orders
            serialized_orders = [order.to_dict() for order in orders]
            return make_response(serialized_orders, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
