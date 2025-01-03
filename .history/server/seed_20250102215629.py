from config import app
from models import db  # Assuming `db` is initialized in models/__init__.py

# Import all your models to register them with SQLAlchemy
from models.carmodels import CarModel
from models.category import Category
from models.orderdetails import OrderDetail
from models.orders import Order
from models.products import Product
from models.user import User
from werkzeug.security import generate_password_hash  # For password hashing

# Drop and recreate all tables
with app.app_context():
    db.drop_all()
    print("All tables dropped successfully!")

    db.create_all()
    print("All tables created successfully!")

    # Seed data for CarModel (AUDI-specific)
    car_data = [
        {"name": "A3", "brand": "AUDI", "year": 2022},
        {"name": "A4", "brand": "AUDI", "year": 2021},
        {"name": "A5", "brand": "AUDI", "year": 2020},
        {"name": "Q7", "brand": "AUDI", "year": 2023},
        {"name": "Q5", "brand": "AUDI", "year": 2021},
        {"name": "RS7", "brand": "AUDI", "year": 2022}
    ]

    for data in car_data:
        car_model = CarModel(**data)
        db.session.add(car_model)

    # Seed data for Categories (AUDI parts-related categories)
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

    # Seed data for Users (For simplicity, using the same users)
    user_data = [
        {"name": "Kaleb", "email": "kaleb@example.com", "password": "password123"},
    ]

    for data in user_data:
        # Hashing the password before saving
        password_hash = generate_password_hash(data["password"])
        user = User(name=data["name"], email=data["email"], _password_hash=password_hash)
        db.session.add(user)

    # Seed data for Products (Enhanced AUDI parts with longer descriptions)
    product_data = [
        # Category 1: Engine Parts
        {
            "category_id": 1, 
            "name": "AUDI Performance Oil Cooler Kit", 
            "price": 599.99, 
            "description": (
                "Keep your engine running at optimal temperatures with this high-performance "
                "oil cooler kit. Designed specifically for AUDI A3, A4, and Q7 models, this kit "
                "ensures enhanced oil cooling for better engine reliability during high-performance driving."
            ), 
            "image_url": "engine1.png", 
            "stock_quantity": 30
        },
        {
            "category_id": 1, 
            "name": "AUDI Engine Air Intake System", 
            "price": 499.99, 
            "description": (
                "Boost engine efficiency and performance with this advanced air intake system. "
                "Designed for AUDI A5 and RS7, it ensures maximum airflow for improved power."
            ), 
            "image_url": "engine2.png", 
            "stock_quantity": 25
        },

        # Category 2: Body Parts
        {
            "category_id": 2, 
            "name": "AUDI Carbon Fiber Rear Diffuser", 
            "price": 1099.99, 
            "description": (
                "Elevate your vehicle's aesthetics and aerodynamics with this sleek carbon fiber "
                "rear diffuser. Engineered for AUDI RS7 and S-line models, this diffuser adds a premium "
                "touch while improving airflow and stability at high speeds."
            ), 
            "image_url": "body1.png", 
            "stock_quantity": 20
        },
        {
            "category_id": 2, 
            "name": "AUDI Custom Side Skirts", 
            "price": 699.99, 
            "description": (
                "Enhance your car's style and aerodynamics with these custom-fit side skirts. "
                "Designed for AUDI Q5 and Q7 models, they add a sporty and sleek profile."
            ), 
            "image_url": "body2.png", 
            "stock_quantity": 30
        },

        # Category 3: Suspension & Steering
        {
            "category_id": 3, 
            "name": "AUDI Adjustable Coilover Suspension", 
            "price": 1249.99, 
            "description": (
                "Achieve the perfect balance of comfort and performance with these adjustable coilover kits. "
                "Tailored for AUDI A5 and Q5 models, the kit allows you to customize ride height and damping, "
                "offering unparalleled control on any road condition."
            ), 
            "image_url": "sus1.png", 
            "stock_quantity": 15
        },
        {
            "category_id": 3, 
            "name": "AUDI Power Steering Pump", 
            "price": 349.99, 
            "description": (
                "Maintain smooth and effortless steering with this high-quality power steering pump. "
                "Compatible with AUDI A3 and Q7 models."
            ), 
            "image_url": "sus2.png", 
            "stock_quantity": 40
        },

        # Category 4: Interior Accessories
        {
            "category_id": 4, 
            "name": "AUDI Premium Leather Seat Covers", 
            "price": 349.99, 
            "description": (
                "Protect and enhance your vehicle's interior with these premium leather seat covers. "
                "Custom fit for AUDI A3, A4, and Q7 models, they add a luxurious touch while ensuring durability."
            ), 
            "image_url": "int1.png", 
            "stock_quantity": 50
        },
        {
            "category_id": 4, 
            "name": "AUDI All-Weather Floor Mats", 
            "price": 129.99, 
            "description": (
                "Keep your car's interior clean and protected with these durable all-weather floor mats. "
                "Custom fit for AUDI Q5 and RS7 models."
            ), 
            "image_url": "int2.png", 
            "stock_quantity": 60
        },

        # Category 5: Exterior Accessories
        {
            "category_id": 5, 
            "name": "AUDI Roof Rack System", 
            "price": 899.99, 
            "description": (
                "Expand your cargo capacity with this sturdy and aerodynamic roof rack system. "
                "Designed for AUDI Q5 and Q7 models, it’s perfect for outdoor adventures or extra luggage."
            ), 
            "image_url": "ext1.png", 
            "stock_quantity": 25
        },
        {
            "category_id": 5, 
            "name": "AUDI Chrome Mirror Caps", 
            "price": 199.99, 
            "description": (
                "Upgrade your car's exterior look with these high-quality chrome mirror caps. "
                "Designed to fit AUDI A5 and RS7 models for a sleek, polished finish."
            ), 
            "image_url": "image/chrome_mirror_caps.jpg", 
            "stock_quantity": 35
        },

        # Category 6: Electrical Parts
        {
            "category_id": 6, 
            "name": "AUDI LED Headlight Kit", 
            "price": 799.99, 
            "description": (
                "Upgrade your lighting with this high-performance LED headlight kit. "
                "Specifically designed for AUDI A5 and RS7 models, it provides brighter and more focused illumination."
            ), 
            "image_url": "image/led_headlight_kit.jpg", 
            "stock_quantity": 40
        },
        {
            "category_id": 6, 
            "name": "AUDI Advanced Battery Management System", 
            "price": 549.99, 
            "description": (
                "Ensure optimal battery performance with this advanced management system. "
                "Compatible with AUDI A4 and Q7 models for reliable electrical operations."
            ), 
            "image_url": "image/battery_management.jpg", 
            "stock_quantity": 20
        }
    ]

    for data in product_data:
        product = Product(**data)
        db.session.add(product)

    db.session.commit()
    print("Seed data inserted successfully!")
