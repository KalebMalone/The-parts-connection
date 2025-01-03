# The Parts Connection

Welcome to the **The Parts Connection**! This application allows users to browse and purchase car parts online. It is built with **Flask** for the backend and **React** for the frontend.

## Features

- Browse car parts by categories
- Add items to the shopping cart
- Place orders for car parts
- View product details
- Sending emails with Flask-Mail

## Technologies Used

- **Backend:** Flask, SQLAlchemy, Flask-Migrate
- **Frontend:** React, Styled Components

## Setup Instructions

### Prerequisites

1. Make sure you have **Python 3.x** and **Node.js** installed.
2. You'll also need **npm** (Node Package Manager) for managing frontend dependencies.

### Setting Up the Backend (Flask)

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/car-parts-app.git
    cd car-parts-app
    ```

2. Set up a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # For Windows, use `venv\Scripts\activate`
    ```

3. Install backend dependencies:
    ```bash
    pipenv install
    ```

4. Initialize the database:
    ```bash
    flask db init
    ```

5. Create migrations:
    ```bash
    flask db migrate -m "Initial migration"
    ```

6. Apply the migrations:
    ```bash
    flask db upgrade
    ```

7. Seed the database with initial data:
    ```bash
    python seed.py
    ```

### Setting Up the Frontend (React)

1. Navigate to the frontend directory:
    ```bash
    cd client
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Run the React development server:
    ```bash
    npm start
    ```

The frontend will be accessible at `http://localhost:3000`.

### Running the App

Once the backend and frontend are set up:

1. Start the Flask backend server:
    ```bash
    flask run
    ```

2. Your backend will be running at `http://localhost:5000`.

Now your app should be running and you can access both the frontend and backend locally.

Insperation https://performancebyie.com
