from models import db

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)

    # Relationship with Category
    category = db.relationship("Category", back_populates="products")
    
    # Relationship with OrderDetail (Many-to-Many relationship)
    order_details = db.relationship("OrderDetail", back_populates="product")

    def __repr__(self):
        return f"""
            <Product #{self.id}:
                category_id: {self.category_id}
                name: {self.name}
                description: {self.description}
                image_url: {self.image_url}
                stock_quantity: {self.stock_quantity}
            >
        """

    def to_dict(self):
        return {
            "id": self.id,
            "category_id": self.category_id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url,
            "stock_quantity": self.stock_quantity
        }
