from flask_restful import Resource
from flask import request, session, make_response
from werkzeug.exceptions import NotFound
from models.orders import Order
from config import db

class OrderByID(Resource):
    def get(self, id):
        try:
            user_id = session.get('user_id')
            import ipdb
            if not user_id:
                return make_response({"error": "User is not logged in."}, 401)

            order = Order.query.get(id)

            if not order:
                raise NotFound("Order not found.")

            if order.user_id != user_id:
                return make_response({"error": "You are not authorized to view this order."}, 403)

            order_data = order.to_dict()
            return make_response(order_data, 200)

        except Exception as e:
            return make_response({"error": str(e)}, 500)

    def delete(self, id):
        try:
            user_id = session.get('user_id')
            if not user_id:
                return make_response({"error": "User is not logged in."}, 401)
            order = Order.query.get(id)
            if not order:
                raise NotFound("Order not found.")
            if order.user_id != user_id:
                return make_response({"error": "You are not authorized to delete this order."}, 403)
            db.session.delete(order)
            db.session.commit()

            return make_response({"message": "Order deleted successfully"}, 200)

        except Exception as e:
            return make_response({"error": f"Failed to delete order. {str(e)}"}, 500)
