from routes.__init__ import Resource, make_response
from models.products import Product

class ProductsByCategory(Resource):
    def get(self, category_id):
        try:
            products = Product.query.filter_by(category_id=category_id).all()
            if not products:
                return {"error": "No products found for this category"}, 404
            serialized_products = [product.to_dict() for product in products]
            return make_response(serialized_products, 200)
        except Exception as e:
            return {"error": str(e)}, 500
