# from flask_restful import Resource
# from flask import request, session, make_response
# from models.orders import Order

# class Orders(Resource):
#     def get(self):
#         try:
#             user_id = session.get("user_id")
#             # import ipdb; ipdb.set_trace()
#             if not user_id:
#                 return make_response({"error": "User is not logged in."}, 401)

#             orders = Order.query.filter_by(user_id=user_id).all()
#             return make_response({"orders": [order.to_dict() for order in orders]}, 200)
#         except Exception as e:
#             return make_response({"error": str(e)}, 500)

# from routes.__init__ import Resource, make_response
# from models.orders import Order  # Import models here, not in `__init__.py`

# class Orders(Resource):
#     def get(self):
#         try:
#             serialized_orders = [order.to_dict() for order in Order.query.all()]
#             return make_response(serialized_orders, 200)
#         except Exception as e:
#             return {"error": str(e)}, 500