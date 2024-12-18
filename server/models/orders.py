from models.__init__ import SerializerMixin, db
from models.user import User
class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    status = db.Column(db.String, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)

    # Use 'User' as a string to avoid circular import
    user = db.relationship("User", back_populates="orders")

    # Define the relationship with the OrderDetail model
    order_details = db.relationship("OrderDetail", back_populates="order")

    serialize_rules = ("-orders",)

    def __repr__(self):
        return f"<Order {self.id}: User {self.user_id}, Status {self.status}>"

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "total_price": self.total_price,
            "user": self.user.to_dict() if self.user else None,
            "order_details": [order_detail.to_dict() for order_detail in self.order_details]
        }
