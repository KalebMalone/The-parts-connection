from werkzeug.exceptions import NotFound
from flask import render_template
from config import app, api
from routes.category.category import Categories
from routes.category.categoryById import CategoryByID
from routes.products.product import Products
from routes.products.productById import ProductByID
from routes.order.orderById import OrderByID
from routes.order.orders import Orders
from routes.order.createorder import CreateOrder
from routes.auth.signup import Signup
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.current_user import CurrentUser
from routes.user.delete import Delete
from routes.user.edit import EditUser
from routes.products.productsByCategory import ProductsByCategory
from routes.user.delete import DeleteOrder

# Error handler for 404
@app.errorhandler(NotFound)
def not_found(error):
    return {"error": error.description}, 404 

# Add resources to the Flask-Restful API
api.add_resource(Categories, "/categories")
api.add_resource(CategoryByID, "/categories/<int:id>")
api.add_resource(Products, "/products")
api.add_resource(ProductByID, "/products/<int:id>")
api.add_resource(Orders, "/orders")
api.add_resource(OrderByID, "/orders/<int:id>")
api.add_resource(CreateOrder, "/orders/create")
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CurrentUser, "/current-user")
api.add_resource(EditUser, "/edit")
api.add_resource(Delete, "/delete-account")
api.add_resource(ProductsByCategory, "/products/category/<int:category_id>")
api.add_resource(DeleteOrder, "/orders/<int:order_id>/delete")

# Run the app
if __name__ == "__main__":
    app.run(port=5555, debug=True)
