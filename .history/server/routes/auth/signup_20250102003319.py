from flask_restful import Resource, request, session
from flask import make_response

from models.user import User
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
from flask_mail import Message
from config import mail
from jinja2 import Template
import datetime
from config import db

bcrypt = Bcrypt()  # Initialize bcrypt

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = bcrypt.generate_password_hash(data.get("password")).decode("utf-8")
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id  # Set session with new user's ID

            # Send welcome email
            self.send_welcome_email(user)

            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            print("User Data being returned:", user_data)  # Debugging log

            return make_response({"user": user_data}, 201)
        except IntegrityError as e:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

    def send_welcome_email(self, user):
        # Prepare the email content
        current_year = datetime.datetime.now().year
        template = Template(open("templates/welcome_message.html").read())
        html_content = template.render(user=user, current_year=current_year)

        # Create the email message
        msg = Message(
            subject="Welcome to Car Parts App!",
            recipients=[user.email],
            html=html_content,
        )

        # Send the email
        try:
            mail.send(msg)
        except Exception as e:
            print(f"Failed to send email: {e}")
