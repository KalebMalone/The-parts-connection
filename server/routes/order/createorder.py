from routes.__init__ import Resource, make_response, request
from models.orders import Order

class CreateOrder(Resource):
    def post(self):
        try:
            order_data = request.get_json()
            new_order = Order(user_id=order_data["user_id"], total=order_data["total"], status=order_data["status"])
            new_order.save()
            return make_response(new_order.to_dict(), 201)
        except Exception as e:
            return {"error": str(e)}, 500
