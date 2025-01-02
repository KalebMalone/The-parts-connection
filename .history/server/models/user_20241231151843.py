from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt
import re

# Initialize Bcrypt
flask_bcrypt = Bcrypt()

# Define the User model
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column("password_hash", db.String(128), nullable=False)

    orders = db.relationship("Order", back_populates="user")
    serialize_rules = ("-_password_hash",)

    def __repr__(self):
        return f'<User {self.id}: {self.name}: {self.email}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }

    @validates("name")
    def validate_name(self, _, value):
        if len(value) < 3:
            raise ValueError("Name must be 3 characters long")
        return value

    @validates("email")
    def validate_email(self, _, email):
        if not re.match(
            r"^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:'.+'))@(?:[a-zA-Z0-9-]+\.)+[a-zA0-9]{2,}$",
            email,
        ):
            raise ValueError("Email not valid")
        return email

    @hybrid_property
    def password(self):
        raise AttributeError("Passwords are private.")

    @password.setter
    def password(self, password_to_validate):
        if not isinstance(password_to_validate, str):
            raise TypeError("Password must be a string")
        if not 10 < len(password_to_validate) < 20:
            raise ValueError("Password must be between 10-20 characters long")
        self._password_hash = flask_bcrypt.generate_password_hash(password_to_validate).decode("utf-8")

    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)
