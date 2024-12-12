from models.__init__ import db

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)

    # Removed relationship
    # category = db.relationship("Category", back_populates="products")
    # compatibilities = db.relationship("ProductCompatibility", foreign_keys="ProductCompatibility.product_id")

    serialize_rules = ("-category.products", "-product_compatibility.product")

    def __repr__(self):
        return f"<Product {self.id}: {self.name}>"
