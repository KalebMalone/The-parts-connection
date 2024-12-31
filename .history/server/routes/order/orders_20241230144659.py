from flask_restful import Resource
from flask import session
from models.orders import Order
from models.user import User

class Orders(Resource):
    def get(self):
        try:
            # Get user_id from session (assumed to be set during login)
            user_id = session.get("user_id")
            
            # If the user is not logged in, return a 401 error
            if not user_id:
                return {"error": "User is not logged in."}, 401

            # Fetch the user object from the database
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found."}, 404

            # Fetch the orders associated with the user_id
            orders = Order.query.filter_by(user_id=user_id).all()

            # Return the orders as a list of dictionaries
            return {"orders": [order.to_dict() for order in orders]}, 200
        except Exception as e:
            # Return a generic error message in case of any exception
            return {"error": str(e)}, 500
