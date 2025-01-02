from flask_mail import Message
from flask import render_template, current_app
from models.user import User
from routes.__init__ import db, session, make_response, request
import datetime
from flask_bcrypt import Bcrypt

class Signup(Resource):
    def post(self):
        data = request.json
        try:
            # Create new user from request data
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = flask_bcrypt.generate_password_hash(data.get("password")).decode("utf-8")

            # Add user to the database
            db.session.add(user)
            db.session.commit()

            # Set session for the user
            session["user_id"] = user.id

            # Create user data response
            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            # Send welcome email
            self.send_welcome_email(user)

            return make_response(user_data, 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

    def send_welcome_email(self, user):
        try:
            # Ensure you're in the app context
            with current_app.app_context():
                # Create a message object
                msg = Message(
                    "Welcome to Car Parts App!",  # Subject line
                    recipients=[user.email],  # Recipient's email
                )

                # Render the HTML content with user data and current year
                msg.html = render_template(
                    "welcome_message.html", user=user, current_year=datetime.datetime.now().year
                )

                # Send the email
                mail.send(msg)
        except Exception as e:
            print(f"Error sending email: {e}")
