from routes.__init__ import Resource, make_response, request
from models.orders import Order
from models.orderdetails import OrderDetail

class CreateOrder(Resource):
    def post(self):
        try:
            order_data = request.get_json()
            new_order = Order(user_id=order_data["user_id"], total_price=order_data["total_price"], status=order_data["status"])
            new_order.save()
            return make_response(new_order.to_dict(), 201)
        except Exception as e:
            return {"error": str(e)}, 500
