from routes.__init__ import Resource, make_response, session, db
from models.orders import Orders

class DeleteOrder(Resource):
    def delete(self, order_id):
        try:
            # Ensure the user is logged in
            if "user_id" not in session:
                return make_response({"error": "User not logged in"}, 401)

            user_id = session["user_id"]
            # Retrieve the order by its ID
            order = Orders.query.filter_by(id=order_id, user_id=user_id).first()

            if not order:
                return make_response({"error": "Order not found or unauthorized"}, 404)

            # Delete the order from the database
            db.session.delete(order)
            db.session.commit()

            return make_response({"message": "Order deleted successfully"}, 200)

        except Exception as e:
            return make_response({"error": str(e)}, 422)
