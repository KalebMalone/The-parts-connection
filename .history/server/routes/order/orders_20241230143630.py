from flask_restful import Resource
from flask import session, make_response
from models.orders import Order
from models.user import User

class Orders(Resource):
    def get(self):
        try:
            user_id = session.get("user_id")
            if not user_id:
                return {"error": "User is not logged in."}, 401

            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found."}, 404

            orders = Order.query.filter_by(user_id=user_id).all()

            user_data = user.to_dict()
            user_data["orders"] = [order.to_dict() for order in orders]

            return make_response(user_data, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
