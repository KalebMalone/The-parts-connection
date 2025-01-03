from models import db, SerializerMixin

class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  # Increased length of name for flexibility
    image_url = db.Column(db.String(255), nullable=True)  # New field for image URLs

    # Serialization rule to exclude the 'categories' attribute in the product serialization
    serialize_rules = ("-products.categories",)

    # Relationship with Product model
    products = db.relationship("Product", back_populates="category", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Category #{self.id}: {self.name}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url  # Include the image URL in the serialized output
        }
