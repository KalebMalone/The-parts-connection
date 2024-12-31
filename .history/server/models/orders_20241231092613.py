from models import db

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    user = db.relationship("User", back_populates="orders")

    def to_dict(self):
        return {
            "id": self.id,
            "total_price": self.total_price,
            "status": self.status,
        }
