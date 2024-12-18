from routes.__init__ import Resource, make_response
from models.orders import Order
from models.orderdetails import OrderDetail

class OrderByID(Resource):
    def get(self, id):
        try:
            order = Order.query.get(id)
            if not order:
                return {"error": "Order not found"}, 404
            return make_response(order.to_dict(), 200)
        except Exception as e:
            return {"error": str(e)}, 500
