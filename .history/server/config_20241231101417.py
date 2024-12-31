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

# Create an instance of the Flask application
app = Flask(__name__)

# Set up the database URI from environment variables
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL", "sqlite:///car_parts.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

# Set secret key for session encryption from environment variables
app.secret_key = environ.get("SESSION_SECRET", "default_secret_key")

# Session configurations for handling cookies across origins
app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_COOKIE_SAMESITE"] = "None"  # Crucial for cross-origin requests
app.config["SESSION_COOKIE_SECURE"] = False  # Set to True in production over HTTPS

# Flask-SQLAlchemy connection to app (only initialize it here)
db = SQLAlchemy()

# Flask-Migrate connection to app
migrate = Migrate(app, db)

# Flask-Restful connection to app
api = Api(app, prefix="/api/v1")

# Flask-Bcrypt connection to app
flask_bcrypt = Bcrypt(app)

# Flask-Mail configuration from environment variables
app.config["MAIL_SERVER"] = environ.get("MAIL_SERVER", "smtp.gmail.com")
app.config["MAIL_PORT"] = int(environ.get("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = environ.get("MAIL_USE_TLS", "True") == "True"
app.config["MAIL_USERNAME"] = environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = environ.get("MAIL_DEFAULT_SENDER", app.config["MAIL_USERNAME"])

# Flask-Mail connection to app
mail = Mail(app)

# Flask-Session connection to app
Session(app)

# Enable Cross-Origin Resource Sharing (CORS) with credentials support
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

# Initialize the db instance here to avoid re-registration
db.init_app(app)

# If you need to define your routes, you can import them here:
# from routes import some_routes

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
