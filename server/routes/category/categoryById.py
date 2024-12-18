from routes.__init__ import Resource, make_response
from models.category import Category

class CategoryByID(Resource):
    def get(self, id):
        try:
            category = Category.query.get(id)
            if not category:
                return {"error": "Category not found"}, 404
            return make_response(category.to_dict(), 200)
        except Exception as e:
            return {"error": str(e)}, 500