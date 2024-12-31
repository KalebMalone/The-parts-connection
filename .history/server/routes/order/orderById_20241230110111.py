from flask_restful import Resource
from models.orders import Order
from flask import request, session
from werkzeug.exceptions import NotFound
from config import db

class OrderByID(Resource):
    def delete(self, id):
        # Check if the user is logged in via session
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "User is not logged in."}, 401

        # Retrieve the order by ID
        order = Order.query.get(id)

        # If the order doesn't exist, return a 404 error
        if not order:
            raise NotFound("Order not found.")

        # Check if the current user owns the order
        if order.user_id != user_id:
            return {"error": "You are not authorized to delete this order"}, 403

        # Delete the order and commit to the database
        try:
            db.session.delete(order)
            db.session.commit()
        except Exception as e:
            return {"error": f"Failed to delete order. {str(e)}"}, 500 

        return {"message": "Order deleted successfully"}, 200
