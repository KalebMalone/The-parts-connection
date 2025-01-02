from flask import request, g, render_template, make_response, session
from flask_restful import Resource
from config import db
from flask_mail import Mail
mail = Mail()