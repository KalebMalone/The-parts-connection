from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from models.orders import Order

class Login(Resource):
    def post(self):
        try:
            data = request.json
            user = User.query.filter_by(email=data.get("email", "")).first()

            if user and user.authenticate(data.get("password", "")):  # Assuming User model has an `authenticate` method
                session["user_id"] = user.id

                # Fetch orders for the logged-in user
                orders = Order.query.filter_by(user_id=user.id).all()

                # Convert user and orders to dicts
                user_data = user.to_dict()
                user_data["orders"] = [order.to_dict() for order in orders]

                return make_response(user_data, 200)

            return make_response({"error": "Invalid credentials."}, 401)

        except Exception as e:
            return make_response({"error": str(e)}, 400)
