# models/orders.py
from models.__init__ import db
from models.orderdetails import OrderDetail
from sqlalchemy.orm import relationship 
class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    status = db.Column(db.String, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)


    serialize_rules = ("-user.orders", "-order_details.order")

    def __repr__(self):
        return f"<Order {self.id}: User {self.user_id}, Status {self.status}>"
