from models import db
from models.products import Product

class OrderDetail(db.Model):
    __tablename__ = "order_details"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_per_item = db.Column(db.Float, nullable=False)

    # Relationships
    order = db.relationship("Order", back_populates="order_details")
    product = db.relationship("Product", back_populates="order_details")

    def __repr__(self):
        return f"<OrderDetail {self.id}: Order {self.order_id}, Product {self.product_id}>"

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price_per_item": self.price_per_item,
            "total_price": round(self.price_per_item * self.quantity, 2),
            "product": self.product.to_dict() if self.product else None,  # Optionally include product details
        }
