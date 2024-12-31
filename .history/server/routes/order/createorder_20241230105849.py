from flask import request, make_response
from models.user import User
from models.orders import Order
from models.orderdetails import OrderDetail
from models.products import Product
from models import db
from routes.__init__ import Resource

class CreateOrder(Resource):
    def post(self):
        try:
            data = request.get_json()

            # Allow order creation with or without user_id (for guest checkout)
            user_id = data.get("user_id")  # Optional: can be None for guest orders
            items = data.get("items")
            total_price = data.get("total_price")

            if not items or not total_price:
                return make_response({"error": "Missing required fields: items or total_price"}, 400)

            # If user_id is provided, try to fetch the user
            if user_id:
                user = User.query.get(user_id)
                if not user:
                    return make_response({"error": "User not found"}, 404)
            else:
                user = None  # No user, guest order

            # Create the order
            order = Order(user_id=user_id if user else None, total_price=total_price, status="Pending")
            db.session.add(order)
            db.session.commit()

            # Add order details for each item
            for item in items:
                product_id = item.get("product_id")
                quantity = item.get("quantity")
                price_per_item = item.get("price_per_item")

                if not product_id or not quantity or not price_per_item:
                    return make_response({"error": "Missing item details"}, 400)

                product = Product.query.get(product_id)
                if not product:
                    return make_response({"error": f"Product with ID {product_id} not found"}, 404)

                order_detail = OrderDetail(
                    order_id=order.id,
                    product_id=product_id,
                    quantity=quantity,
                    price_per_item=price_per_item
                )
                db.session.add(order_detail)

            db.session.commit()

            return make_response({"message": "Order created successfully", "order_id": order.id}, 201)

        except Exception as e:
            # Log the error for debugging purposes
            print(f"Error creating order: {e}")
            return make_response({"error": "An error occurred while processing the order."}, 500)
