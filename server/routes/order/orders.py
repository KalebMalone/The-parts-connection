from routes.__init__ import Resource, make_response
from models.orders import Order  # Import models here, not in `__init__.py`

class Orders(Resource):
    def get(self):
        try:
            serialized_orders = [order.to_dict() for order in Order.query.all()]
            return make_response(serialized_orders, 200)
        except Exception as e:
            return {"error": str(e)}, 500
