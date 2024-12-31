from flask_restful import Resource
from flask import session, make_response
from models.orders import Order
import ipdb from
class Orders(Resource):
    def get(self):
        if not session.get("user_id"):
            import ipdb; ipdb.set_trace()
            print("Hello")
        # try:
        #     user_id = session.get("user_id")
        #     import ipdb; ipdb.set_trace()
        #     if not user_id:
        #         return make_response({"error": "User is not logged in."}, 401)

        #     orders = Order.query.filter_by(user_id=user_id).all()
        #     return make_response({"orders": [order.to_dict() for order in orders]}, 200)
        # except Exception as e:
        #     return make_response({"error": str(e)}, 500)