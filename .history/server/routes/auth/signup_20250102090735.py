from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError
from config import mail, Message
# from flask_mail import Message
from flask import render_template

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            print(f"Signup request received: {data}")

            if not data.get("name"):
                print("Error: Name is missing from request data")
                return make_response({"error": "Name is required."}, 400)

            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")
            db.session.add(user)
            db.session.commit()
            print(f"User {user.email} successfully created with ID {user.id}")

            session["user_id"] = user.id
            print(f"Session updated with user ID: {session['user_id']}")

            try:
                msg = Message(
                    subject="Welcome to Car Parts App!",
                    recipients=[user.email],
                    html=render_template(
                        "welcome_message.html",
                        user={"name": user.name}
                    ),
                )
                mail.send(msg)
                print(f"Welcome email sent to {user.email}")
            except Exception as email_error:
                print(f"Error sending email: {email_error}")
                return make_response({"error": "Failed to send welcome email."}, 500)

            user_data = user.to_dict()
            user_data["orders"] = []
            print(f"Response data prepared: {user_data}")

            return make_response(user_data, 201)
        except IntegrityError:
            db.session.rollback()
            print("Error: Email already in use")
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return make_response({"error": str(e)}, 400)
