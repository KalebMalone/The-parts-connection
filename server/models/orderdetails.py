from models.__init__ import db
from sqlalchemy.orm import relationship

class OrderDetail(db.Model):
    __tablename__ = "order_details"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    quantity = db.Column(db.Integer, nullable=False)
    price_per_item = db.Column(db.Integer, nullable=False)

    # Define the relationship to Order model
    order = db.relationship("Order", back_populates="order_details")

    serialize_rules = ("-order.order_details",)

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price_per_item": self.price_per_item,
        }

    def __repr__(self):
        return f"<OrderDetail {self.id}: Order {self.order_id}, Product {self.product_id}>"
