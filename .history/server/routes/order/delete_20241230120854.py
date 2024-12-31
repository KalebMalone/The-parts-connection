from routes.__init__ import Resource, make_response, session, db
from models.orders import Orders

class Delete(Resource):
    def delete(self):