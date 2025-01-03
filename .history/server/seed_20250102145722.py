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
        },
        {
            "category_id": 4, 
            "name": "AUDI Premium Leather Seat Covers", 
            "price": 249.99, 
            "description": (
                "Protect and enhance your car's interior with these premium leather seat covers. "
                "Specifically designed for AUDI A6 and A8 models, they feature a snug fit, durable materials, "
                "and a luxurious finish for an upgraded interior."
            ), 
            "image_url": "leather_seat_covers.jpg", 
            "stock_quantity": 50
        },
        {
            "category_id": 5, 
            "name": "AUDI Roof Spoiler", 
            "price": 749.99, 
            "description": (
                "Add a sporty touch to your AUDI Q5 or Q7 with this roof spoiler. Constructed from "
                "high-quality materials, it provides improved aerodynamics and a bold visual statement."
            ), 
            "image_url": "roof_spoiler.jpg", 
            "stock_quantity": 25
        },
        {
            "category_id": 6, 
            "name": "AUDI High-Output Alternator", 
            "price": 449.99, 
            "description": (
                "Upgrade your vehicle's electrical system with this high-output alternator. Ideal for AUDI models "
                "requiring additional power for accessories and performance parts, ensuring consistent and reliable operation."
            ), 
            "image_url": "high_output_alternator.jpg", 
            "stock_quantity": 35
        },
        {
            "category_id": 2, 
            "name": "AUDI Front Lip Splitter", 
            "price": 599.99, 
            "description": (
                "Enhance the aggressive look of your AUDI A4 or A5 with this front lip splitter. It "
                "not only adds style but also improves aerodynamic efficiency, reducing lift at high speeds."
            ), 
            "image_url": "front_lip_splitter.jpg", 
            "stock_quantity": 15
        },
        {
            "category_id": 3, 
            "name": "AUDI Power Steering Pump", 
            "price": 299.99, 
            "description": (
                "Ensure smooth and effortless steering with this OEM-quality power steering pump. "
                "Compatible with multiple AUDI models, it's built to withstand demanding conditions."
            ), 
            "image_url": "power_steering_pump.jpg", 
            "stock_quantity": 40
        },
        {
            "category_id": 4, 
            "name": "AUDI Custom Dashboard Trim", 
            "price": 179.99, 
            "description": (
                "Upgrade your car's interior with this stylish custom dashboard trim. Designed for "
                "AUDI Q7 and A6 models, it adds a touch of elegance and personalization to your ride."
            ), 
            "image_url": "dashboard_trim.jpg", 
            "stock_quantity": 25
        },
        {
            "category_id": 6, 
            "name": "AUDI Ignition Coil Set", 
            "price": 349.99, 
            "description": (
                "Boost your engine's performance and reliability with this premium ignition coil set. "
                "Designed for AUDI S-line models, it ensures optimal combustion for maximum efficiency."
            ), 
            "image_url": "ignition_coil_set.jpg", 
            "stock_quantity": 50
        }
    ]

    for data in product_data:
        product = Product(**data)
        db.session.add(product)

    # Seed data for Orders (Example orders)
    order_data = [
        {"user_id": 1, "status": "Processing", "total_price": 2259.97},
        {"user_id": 2, "status": "Shipped", "total_price": 1200.00}
    ]

    for data in order_data:
        order = Order(**data)
        db.session.add(order)

    # Seed data for OrderDetails (Example order details)
    order_details_data = [
        {"order_id": 1, "product_id": 2, "quantity": 1, "price_per_item": 1099.99},
        {"order_id": 1, "product_id": 3, "quantity": 1, "price_per_item": 1249.99},
        {"order_id": 2, "product_id": 4, "quantity": 2, "price_per_item": 249.99}
    ]

    for data in order_details_data:
        order_detail = OrderDetail(**data)
        db.session.add(order_detail)

    db.session.commit()
    print("Seed data inserted successfully!")
