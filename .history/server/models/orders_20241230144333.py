from models import db
from models.user import User  # Avoid circular import
from models.orderdetails import OrderDetail  # Assuming you have an OrderDetail model

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)  # Allow null user_id for guest orders
    status = db.Column(db.String, nullable=False, default="pending")
    total_price = db.Column(db.Float, nullable=False)

    # Define relationships
    user = db.relationship("User", back_populates="orders", lazy="joined")
    order_details = db.relationship("OrderDetail", back_populates="order", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Order {self.id}: User {self.user_id}, Status {self.status}>"

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "total_price": self.total_price,
            "order_details": [detail.to_dict() for detail in self.order_details],
        }
