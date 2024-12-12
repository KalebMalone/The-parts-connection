from models import SerializerMixin, validates, db
# from sqlalchemy.orm import relationship 
class CarModel(db.Model, SerializerMixin):
    __tablename__ = "car_models"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    brand = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)

    serialize_rules = ('-product_compatibility.car_model',)

    def __repr__(self):
        return f"<CarModel #{self.id}: name={self.name}, brand={self.brand}, year={self.year}>"
