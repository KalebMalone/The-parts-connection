from models.__init__ import db, SerializerMixin

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)

    serialize_rules = ("-category.products")

    def __repr__(self):
        return f"""
            <Product #{self.id}:
                category_id: {self.category_id}
                name: {self.name}
                description: {self.description}
                image_url: {self.image_url}
                stock_quantity: {self.stock_quantity}>
        """

    # If SerializerMixin doesn't automatically provide this, define the `to_dict` method
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
