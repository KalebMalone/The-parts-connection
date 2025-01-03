from config import app
from models import db  # Assuming `db` is initialized in models/__init__.py

# Import all your models to register them with SQLAlchemy
from models.carmodels import CarModel
from models.category import Category
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

    # Seed data for CarModel (AUDI-specific)
    category_data = [
        {"name": "Engine Parts", "image_url": "SS1.png"},
        {"name": "Body Parts", "image_url": "SS2.png"},
        {"name": "Suspension & Steering", "image_url": "SS3.png"},
    {"name": "Interior Accessories", "image_url": "SS4.png"},
    {"name": "Exterior Accessories", "image_url": "SS5.png"},
    {"name": "Electrical Parts", "image_url": "SS6.png"}
]

for data in category_data:
    category = Category(**data)
    db.session.add(category)

db.session.commit()
print("Seed data inserted successfully!")


    for data in car_data:
        car_model = CarModel(**data)
        db.session.add(car_model)

    # Seed data for Categories (AUDI parts-related categories)
    category_data = [
        {"name": "Engine Parts"},
        {"name": "Body Parts"},
        {"name": "Suspension & Steering"},
        {"name": "Interior Accessories"},
        {"name": "Exterior Accessories"},
        {"name": "Electrical Parts"}
    ]

    for data in category_data:
        category = Category(**data)
        db.session.add(category)

    # Seed data for Users (For simplicity, using the same users)
    user_data = [
        {"name": "Kaleb", "email": "kaleb@example.com", "password": "password123"},
    ]

    for data in user_data:
        user = User(name=data["name"], email=data["email"], _password_hash=data["password"])
        db.session.add(user)

    # Seed data for Products (Enhanced AUDI parts with longer descriptions)
    product_data = [
        {
            "category_id": 1, 
            "name": "AUDI Performance Oil Cooler Kit", 
            "price": 599.99, 
            "description": (
                "Keep your engine running at optimal temperatures with this high-performance "
                "oil cooler kit. Designed specifically for AUDI A3, A4, and Q7 models, this kit "
                "ensures enhanced oil cooling for better engine reliability during high-performance driving."
            ), 
            "image_url": "performance_oil_cooler.jpg", 
            "stock_quantity": 30
        },
        {
            "category_id": 2, 
            "name": "AUDI Carbon Fiber Rear Diffuser", 
            "price": 1099.99, 
            "description": (
                "Elevate your vehicle's aesthetics and aerodynamics with this sleek carbon fiber "
                "rear diffuser. Engineered for AUDI RS7 and S-line models, this diffuser adds a premium "
                "touch while improving airflow and stability at high speeds."
            ), 
            "image_url": "carbon_fiber_diffuser.jpg", 
            "stock_quantity": 20
        },
        {
            "category_id": 3, 
            "name": "AUDI Adjustable Coilover Suspension", 
            "price": 1249.99, 
            "description": (
                "Achieve the perfect balance of comfort and performance with these adjustable coilover kits. "
                "Tailored for AUDI A5 and Q5 models, the kit allows you to customize ride height and damping, "
                "offering unparalleled control on any road condition."
            ), 
            "image_url": "coilover_suspension.jpg", 
            "stock_quantity": 15
        }
    ]

    for data in product_data:
        product = Product(**data)
        db.session.add(product)

    db.session.commit()
    print("Seed data inserted successfully!")