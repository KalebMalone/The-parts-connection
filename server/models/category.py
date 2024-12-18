from models.__init__ import SerializerMixin, validates, db

class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)


    serialize_rules=("-products.categories",)


    def __repr__(self):
        return f'<Category {self.id}: {self.name}>'