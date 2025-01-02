from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
from os import environ

# Load environment variables from .env
load_dotenv()

# Initialize Flask application
app = Flask(__name__)

# Configure the Flask app with environment variables
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL", "sqlite:///car_parts.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SESSION_TYPE"] = "sqlalchemy"
app.secret_key = environ.get("SESSION_SECRET", "default_secret_key")

# Initialize extensions
db = SQLAlchemy(app)
Session(app)
migrate = Migrate(app, db)
api = Api(app, prefix="/api/v1")
flask_bcrypt = Bcrypt(app)

# Flask-Mail configuration
app.config["MAIL_SERVER"] = environ.get("MAIL_SERVER", "smtp.gmail.com")
app.config["MAIL_PORT"] = int(environ.get("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = environ.get("MAIL_USE_TLS", "True") == "True"
app.config["MAIL_USERNAME"] = environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = environ.get("MAIL_DEFAULT_SENDER", app.config["MAIL_USERNAME"])

mail = Mail(app)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
