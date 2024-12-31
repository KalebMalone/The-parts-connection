from flask_restful import Resource, reqparse
from werkzeug.exceptions import NotFound
from models.orders import Order  # Assuming the Order model exists and is imported correctly
from config import db, session, make_response  # Ensure the session and db are correctly imported

class DeleteOrder(Resource):
    def delete(self, order_id):
        try:
            # Check if the user is logged in
            if "user_id" not in session:
                return make_response({"error": "User not logged in"}, 401)
            user_id = session["user_id"]

            # Retrieve the order from the database
            order = Order.query.filter_by(id=order_id, user_id=user_id).first()  # Ensure the order belongs to the logged-in user
            if not order:
                return make_response({"error": "Order not found or unauthorized"}, 404)

            # Delete the order from the database
            db.session.delete(order)
            db.session.commit()
            
            return make_response({"message": "Order deleted successfully"}, 200)

        except Exception as e:
            return make_response({"error": str(e)}, 422)
