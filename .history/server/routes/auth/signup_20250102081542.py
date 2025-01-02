from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
from sqlalchemy.exc import IntegrityError
from config import mail  # Import the mail object from config
from flask_mail import Message 
from flask import render_template

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            if not data.get("name"):
                return make_response({"error": "Name is required."}, 400)
            
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id

            msg = Message(
                subject="Welcome to Car Parts App!",
                recipients=[user.email],
                html=render_template(
                    "welcome_email.html",
                    user={"name": user.name}
                ),
            )
            mail.send(msg)

            user_data = user.to_dict()
            user_data["orders"] = []

            return make_response(user_data, 201)
        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

