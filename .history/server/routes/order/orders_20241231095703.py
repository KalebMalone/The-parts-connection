from flask_restful import Resource
from flask import session, make_response
from models.orders import Order
from routes.auth.current_user import CurrentUser
class Orders(Resource):
    def get(self):
        try:
            user_id = session.get("user_id")
            if not user_id:
                return make_response({"error": "User is not logged in."}, 401)

            orders = Order.query.filter(Order.user_id==CurrentUser).all()
            return make_response({"orders": [order.to_dict() for order in orders]}, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)