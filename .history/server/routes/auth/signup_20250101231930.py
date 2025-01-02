from flask_mail import Message
from flask import render_template, current_app
from routes.__init__ import Resource, request, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError
from flask_mail import Mail
import datetime
from config impo
flask_bcrypt = Bcrypt()  # Initialize Flask-Bcrypt
mail = Mail()  # Initialize Flask-Mail


class Signup(Resource):
    def post(self):
        try:
            # Get user data from the request body
            data = request.json
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")  # Ensure password hashing in your model

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
