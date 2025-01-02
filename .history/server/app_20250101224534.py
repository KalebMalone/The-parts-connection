from routes.user.delete import Delete

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
api.add_resource(Delete, "/delete-account")  # Updated URL for the delete account route
api.add_resource(ProductsByCategory, "/products/category/<int:category_id>")

# Run the app
if __name__ == "__main__":
    app.run(port=5555, debug=True)
