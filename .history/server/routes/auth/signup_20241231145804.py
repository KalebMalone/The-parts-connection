from flask_mail import Message
from flask import render_template
from routes import Resource, request, db, make_response, session, mail
from models.user import User
from sqlalchemy.exc import IntegrityError
import datetime

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")  # Ensure password hashing in your model
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id  # Set session with new user's ID

            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            # Send welcome email
            self.send_welcome_email(user)

            return make_response(user_data, 201)
        except IntegrityError as e:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

    def send_welcome_email(self, user):
        try:
            # Prepare the email content using the welcome template
            msg = Message(
                "Welcome to Car Parts App!",
                recipients=[user.email]
            )

            # Render HTML template and pass the user data
            msg.html = render_template("welcome_message.html", user=user, current_year=datetime.datetime.now().year)

            # Send the email
            mail.send(msg)
        except Exception as e:
            print(f"Error sending email: {e}")
