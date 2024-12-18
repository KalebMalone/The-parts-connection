from routes.__init__ import Resource, make_response
from models.category import Category

class Categories(Resource):
    def get(self):
        try:
            serialized_cat = [cat.to_dict() for cat in Category.query]
            return make_response(serialized_cat, 200)
        except Exception as e:
            return {"error": str(e)}, 500