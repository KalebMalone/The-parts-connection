from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_mail import Mail
from os import environ
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL", "sqlite:///car_parts.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY"] = SQLAlchemy(app)

app.secret_key = environ.get("SESSION_SECRET", "default_secret_key")

db = SQLAlchemy(app)
session_manager = Session(app)
bcrypt = Bcrypt(app)
api = Api(app, prefix="/api/v1")
mail = Mail(app)

from models import User
from resources import Signup

api.add_resource(Signup, "/signup")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
