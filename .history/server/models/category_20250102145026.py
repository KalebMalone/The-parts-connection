from models import db, SerializerMixin

class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)  # Store image file name

    serialize_rules = ("-products.categories",)

    products = db.relationship("Product", back_populates="category", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Category #{self.id}: {self.name}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url  # Include image URL for API responses
        }
