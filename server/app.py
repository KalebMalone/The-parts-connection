from flask import Flask
from models import db
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)


# # app.py
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate


# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///car_parts.db'  # SQLite database
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)
# migrate = Migrate(app, db)

# # Function to create tables
# def create_tables():
#     with app.app_context():
#         db.create_all()  # Creates all the tables defined in models

# # Function to seed the database
# def seed_data():
#     create_categories()
#     create_products()
#     create_users()
#     create_orders()

# # Function to create categories
# def create_categories():
#     categories = [
#         Category(name='Engine Parts'),
#         Category(name='Suspension Parts'),
#         Category(name='Brakes'),
#         Category(name='Transmission Parts'),
#         Category(name='Exhaust Parts')
#     ]
#     db.session.add_all(categories)
#     db.session.commit()

# # Function to create products
# def create_products():
#     engine_parts = Category.query.filter_by(name='Engine Parts').first()
#     suspension_parts = Category.query.filter_by(name='Suspension Parts').first()
#     brakes = Category.query.filter_by(name='Brakes').first()
#     transmission_parts = Category.query.filter_by(name='Transmission Parts').first()
#     exhaust_parts = Category.query.filter_by(name='Exhaust Parts').first()

#     products = [
#         Product(name='Air Filter', description='High-performance air filter', price=50.0, category_id=engine_parts.id),
#         Product(name='Performance Coilovers', description='Adjustable coilovers', price=1200.0, category_id=suspension_parts.id),
#         Product(name='Brake Pads Set', description='High-quality brake pads', price=75.0, category_id=brakes.id),
#         Product(name='Clutch Kit', description='Heavy-duty clutch kit', price=350.0, category_id=transmission_parts.id),
#         Product(name='Cat-Back Exhaust System', description='Performance exhaust system', price=700.0, category_id=exhaust_parts.id)
#     ]
#     db.session.add_all(products)
#     db.session.commit()

# # Function to create users
# def create_users():
#     users = [
#         User(username='john_doe', email='john@example.com', password='password123'),
#         User(username='jane_smith', email='jane@example.com', password='password456')
#     ]
#     db.session.add_all(users)
#     db.session.commit()

# # Function to create orders
# def create_orders():
#     user1 = User.query.filter_by(username='john_doe').first()
#     user2 = User.query.filter_by(username='jane_smith').first()

#     product1 = Product.query.filter_by(name='Air Filter').first()
#     product2 = Product.query.filter_by(name='Brake Pads Set').first()

#     order1 = Order(user_id=user1.id)
#     order2 = Order(user_id=user2.id)

#     db.session.add_all([order1, order2])
#     db.session.commit()

#     order_detail1 = OrderDetail(order_id=order1.id, product_id=product1.id, quantity=2)
#     order_detail2 = OrderDetail(order_id=order1.id, product_id=product2.id, quantity=1)
#     order_detail3 = OrderDetail(order_id=order2.id, product_id=product1.id, quantity=1)

#     db.session.add_all([order_detail1, order_detail2, order_detail3])
#     db.session.commit()

# # Main function to create tables and seed data
# if __name__ == '__main__':
#     create_tables()  # Create tables
#     seed_data()  # Seed the database with data
#     print("Seed data inserted successfully!")
#     app.run(debug=True)
