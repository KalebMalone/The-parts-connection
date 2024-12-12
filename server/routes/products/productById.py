from routes.__init__ import Resource, make_response
from models.products import Product

class ProductByID(Resource):
    def get(self, id):
        try:
            product = Product.query.get(id)
            if not product:
                return {"error": "Product not found"}, 404
            return make_response(product.to_dict(), 200)
        except Exception as e:
            return {"error": str(e)}, 500