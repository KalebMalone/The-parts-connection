from models import db
from models.orderdetails import OrderDetail

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String, nullable=False, default="pending")
    total_price = db.Column(db.Float, nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="orders", lazy="joined")
    order_details = db.relationship("OrderDetail", back_populates="order", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "total_price": self.total_price,
            "order_details": [detail.to_dict() for detail in self.order_details],
        }
