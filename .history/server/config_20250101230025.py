from flask import Flask, render_template, request, make_response, session
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from flask_cors import CORS
from dotenv import load_dotenv
from os import environ
import datetime

# Load environment variables from .env
load_dotenv()

# Create an instance of the Flask application
app = Flask(__name__)

# Set up the database URI from environment variables
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL", "sqlite:///car_parts.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SESSION_TYPE"] = "sqlalchemy"

# Set secret key for session encryption from environment variables
app.secret_key = environ.get("SECRET_KEY")
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True

# Flask-Mail setup
app.config["MAIL_SERVER"] = environ.get("MAIL_SERVER")
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = environ.get("MAIL_PASSWORD")
mail = Mail(app)

# Initialize Flask extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)
Session(app)

CORS(app)
