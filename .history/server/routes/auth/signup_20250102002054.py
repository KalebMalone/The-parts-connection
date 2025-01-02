from flask_mail import Message
from jinja2 import Template
from flask import render_template
from routes.__init__ import mail, db # Ensure mail is imported

class Signup(Resource):
    def post(self):
        try:
            data = request.json
            user = User(email=data.get("email"), name=data.get("name"))
            user.password = data.get("password")  # Ensure password hashing in your model
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id  # Set session with new user's ID

            # Send welcome email
            try:
                with open("templates/welcome_message.html", "r") as f:
                    html_template = Template(f.read())
                rendered_email = html_template.render(user={"name": user.name}, current_year=datetime.datetime.now().year)

                msg = Message(
                    subject="Welcome to Car Parts App!",
                    recipients=[user.email],
                    html=rendered_email
                )
                mail.send(msg)
            except Exception as email_error:
                print(f"Failed to send email: {email_error}")

            user_data = user.to_dict()
            user_data["orders"] = []  # New users have no orders yet

            print("User Data being returned:", user_data)  # Debugging log

            return make_response({"user": user_data}, 201)
        except IntegrityError:
            return make_response({"error": "Email is already in use."}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
