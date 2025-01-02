from flask import Flask, render_template, request, make_response, session
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_mail import Mail
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
app.secret_key = environ.get("SESSION_SECRET", "default_secret_key")

# Flask-SQLAlchemy connection to app
db = SQLAlchemy(app)
app.config["SESSION_SQLALCHEMY"] = db  # Ensure the correct instance is passed

# Flask-Migrate connection to app
migrate = Migrate(app, db)

# Flask-Restful connection to app
api = Api(app, prefix="/api/v1")

# Flask-Bcrypt connection to app
flask_bcrypt = Bcrypt(app)

# Flask-Mail configuration from environment variables
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'partscar373@gmail.com'
app.config['MAIL_PASSWORD'] = 'your_password'


# Flask-Mail connection to app
mail = Mail(app)

# Flask-Session connection to app (do not initialize a new SQLAlchemy instance)
Session(app)

# Enable Cross-Origin Resource Sharing (CORS) with credentials support
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
