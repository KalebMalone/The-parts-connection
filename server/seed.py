from config import app
from models import db  # Assuming `db` is initialized in models/__init__.py

# Import all your models to register them with SQLAlchemy
from models.carmodels import CarModel
from models.categories import Category
from models.orderdetails import OrderDetail
from models.orders import Order
from models.products import Product
from models.user import User

# Drop and recreate all tables
with app.app_context():
    db.drop_all()
    print("All tables dropped successfully!")

    db.create_all()
    print("All tables created successfully!")

    # Seed data for CarModel
    car_data = [
        {"name": "Model S", "brand": "Tesla", "year": 2020},
        {"name": "Mustang", "brand": "Ford", "year": 2021},
        {"name": "Civic", "brand": "Honda", "year": 2022},
        {"name": "F-150", "brand": "Ford", "year": 2023}
    ]
    
    for data in car_data:
        car_model = CarModel(**data)
        db.session.add(car_model)

    # Seed data for Category
    category_data = [
        {"name": "Electronics"},
        {"name": "Accessories"},
        {"name": "Tools"}
    ]
    
    for data in category_data:
        category = Category(**data)
        db.session.add(category)

    # Seed data for Users
    user_data = [
        {"name": "Kaleb", "email": "kaleb@example.com", "password": "password123"},
        {"name": "Casey", "email": "casey@example.com", "password": "password456"}
    ]
    
    for data in user_data:
        user = User(name=data["name"], email=data["email"], _password_hash=data["password"])
        db.session.add(user)

    # Seed data for Products
    product_data = [
        {"category_id": 1, "name": "Phone", "price": 999, "description": "Latest model", "image_url": "phone.jpg", "stock_quantity": 100},
        {"category_id": 2, "name": "Car Charger", "price": 29, "description": "Fast charging car charger", "image_url": "charger.jpg", "stock_quantity": 200},
        {"category_id": 3, "name": "Wrench", "price": 49, "description": "Durable wrench", "image_url": "wrench.jpg", "stock_quantity": 50}
    ]
    
    for data in product_data:
        product = Product(**data)
        db.session.add(product)

    # Seed data for Orders
    order_data = [
        {"user_id": 1, "status": "Processing", "total_price": 1028},
        {"user_id": 2, "status": "Shipped", "total_price": 249}
    ]
    
    for data in order_data:
        order = Order(**data)
        db.session.add(order)

    # Seed data for OrderDetails
    order_details_data = [
        {"order_id": 1, "product_id": 1, "quantity": 1, "price_per_item": 999},
        {"order_id": 1, "product_id": 2, "quantity": 1, "price_per_item": 29},
        {"order_id": 2, "product_id": 3, "quantity": 1, "price_per_item": 49}
    ]
    
    for data in order_details_data:
        order_detail = OrderDetail(**data)
        db.session.add(order_detail)

    db.session.commit()
    print("Seed data inserted successfully!")
