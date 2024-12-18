from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from os import environ

# Create an instance of the Flask application
app = Flask(__name__)

# Set up the database URI
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///car_parts.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SESSION_TYPE"] = "sqlalchemy"

# Set secret key for session encryption
app.secret_key = environ.get("SESSION_SECRET", default=b'\x01\x985y\x83\xdfS\x86\x94\n\xf4\x89\x12N,jkO\x1af7\xb8\xd5\xdf')

# Flask-SQLAlchemy connection to app
db = SQLAlchemy(app)
app.config["SESSION_SQLALCHEMY"] = db

# Flask-Migrate connection to app
migrate = Migrate(app, db)

# Flask-Restful connection to app
api = Api(app, prefix="/api/v1")

# Flask-Bcrypt connection to app
flask_bcrypt = Bcrypt(app)

# Flask-Session connection to app
Session(app)
