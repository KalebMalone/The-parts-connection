from flask_mail import Message
from flask import render_template, current_app
from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError
from flask_mail import Mail
from werkzeug.security import generate_password_hash
import datetime

# Ensure 'mail' is imported correctly from config.py
from config import mail

class Signup(Resource):
    def post(self):
        try:
            # Get user data from the request body
            data = request.json
            password = data.get("password")

            # Log the received password to verify it
            print(f"Received password: '{password}' with length {len(password)}")

            # Password length validation
            if len(password) < 10 or len(password) > 20:
                return make_response({"error": "Password must be between 10 and 20 characters long."}, 400)

            # Ensure password is hashed before saving to the database
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = generate_password_hash(password)  # Hash the password

            # Add user to the database
            db.session.add(user)
            db.session.commit()

            # Set session with the new user's ID
            session["user_id"] = user.id

            # Prepare the user data response
            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            # Send the welcome email
            self.send_welcome_email(user)

            return make_response(user_data, 201)
        except IntegrityError as e:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

    def send_welcome_email(self, user):
        try:
            # Ensure we're in the correct app context
            with current_app.app_context():
                # Create the email message
                msg = Message(
                    "Welcome to Car Parts App!",  # Subject
                    recipients=[user.email],  # Recipient's email
                )

                # Render the HTML content of the email using the template
                msg.html = render_template(
                    "welcome_message.html", user=user, current_year=datetime.datetime.now().year
                )

                # Send the email
                mail.send(msg)
        except Exception as e:
            print(f"Error sending email: {e}")
