from routes.__init__ import Resource, make_response
from models.products import Product

class Products(Resource):
    def get(self):
        try:
            # Use .all() to actually query and get the data
            serialized_products = [product.to_dict() for product in Product.query.all()]
            return make_response(serialized_products, 200)
        except Exception as e:
            return {"error": str(e)}, 500
