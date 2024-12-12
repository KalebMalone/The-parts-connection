# models/user.py
from config import flask_bcrypt
from models.__init__ import db
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import re
from sqlalchemy_serializer import SerializerMixin 
from sqlalchemy.orm import relationship

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column("password_hash", db.String(20), nullable=False)


    serialize_rules = ("-_password_hash",)

    def __repr__(self):
        return f'<User {self.id}: {self.name}: {self.email}>'
    
    @validates("name")
    def validate_name(self, _, value):
        if len(value) < 3:
            raise ValueError("name must be 3 characters long")
        return value
    
    @validates("email")
    def validate_email(self, _, email):
        if not re.match(
            r"^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:'.+'))@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$",
            email,
        ):
            raise ValueError("email not valid")
        return email

    @hybrid_property
    def password(self):
        raise AttributeError("passwords are private.")

    @password.setter
    def password(self, password_to_validate):
        if not isinstance(password_to_validate, str):
            raise TypeError("password must be a string")
        if not 10 < len(password_to_validate) < 20:
            raise ValueError("password must be between 10-20 characters long")
        hashed_password = flask_bcrypt.generate_password_hash(
            password_to_validate
        ).decode("utf-8")
        self._password_hash = hashed_password

    def auth(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)