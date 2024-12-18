from routes.__init__ import Resource, make_response
from models.orders import Order
from models.orderdetails import OrderDetail

class UpdateOrder(Resource):
    def patch(self, id):
        try:
            order = Order.query.get(id)
            if not order:
                return {"error": "Order not found"}, 404

            order.status = "Updated"
            order.save()
            return make_response(order.to_dict(), 200)
        except Exception as e:
            return {"error": str(e)}, 500