from models.__init__ import db
# from sqlalchemy.orm import relationship 
class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)

    serialize_rules = ("-products.category",)

    def __repr__(self):
        return f"<Category {self.id}: {self.name}>"
