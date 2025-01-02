from flask import Flask, request, make_response, session
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
from os import environ

load_dotenv()

app = Flask(__name__)

# Configurations from .env
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL", "sqlite:///car_parts.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY"] = SQLAlchemy(app)

app.secret_key = environ.get("SESSION_SECRET", "default_secret_key")

db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app, prefix="/api/v1")
flask_bcrypt = Bcrypt(app)

app.config["MAIL_SERVER"] = environ.get("MAIL_SERVER", "smtp.gmail.com")
app.config["MAIL_PORT"] = int(environ.get("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = environ.get("MAIL_USE_TLS", "True") == "True"
app.config["MAIL_USERNAME"] = environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = environ.get("MAIL_DEFAULT_SENDER", app.config["MAIL_USERNAME"])

mail = Mail(app)
Session(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})
