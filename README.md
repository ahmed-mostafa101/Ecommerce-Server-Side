# E-commerce Platform (Server Side)

This is the back-end server for an e-commerce application built using **Node.js**, **Express.js**, and **MongoDB**. The project is organized into different layers including controllers, routes, models, and middleware to ensure scalability, maintainability, and clean code.

## Project Structure

The project is structured as follows:

- **`controllers/`**: This directory contains controller files responsible for handling requests and sending appropriate responses. Each controller corresponds to a specific feature of the e-commerce app.
  - **`cartControllers.js`**: Handles requests related to cart operations such as adding/removing products from the cart.
  - **`ordersControllers.js`**: Manages user orders including placing orders, updating order status, etc.
  - **`productsControllers.js`**: Deals with product-related operations like listing products, filtering, and sorting.
  - **`userControllers.js`**: Manages user actions such as registration, login, and user data manipulation.

- **`middleware/`**: This folder contains middleware used for authentication and other request validations.
  - **`authMiddleware.js`**: Middleware that handles user authentication and protects routes from unauthorized access.

- **`models/`**: This folder contains Mongoose models that define the structure of the documents in MongoDB.
  - **`cartModel.js`**: Defines the schema for the user's shopping cart, including product and quantity details.
  - **`ordersModel.js`**: Defines the order schema including order details, status, and payment info.
  - **`productModel.js`**: Defines the schema for products including product details like name, price, description, etc.
  - **`userModel.js`**: Defines the schema for user information such as name, email, password, and roles.

- **`routes/`**: This folder contains the route definitions for various endpoints of the API.
  - **`cartRoutes.js`**: Endpoints for managing cart operations.
  - **`ordersRoutes.js`**: Endpoints for handling user orders.
  - **`productsRoutes.js`**: Endpoints for product listing, filtering, and sorting.
  - **`userRoutes.js`**: Endpoints for user authentication and profile management.

- **`index.js`**: The main entry point of the application, responsible for bootstrapping the Express server and connecting to MongoDB.

## Features
- **User Authentication**: JWT-based authentication system.
- **Product Management**: List, filter, and sort products.
- **Shopping Cart**: Add/remove items from the user's cart.
- **Order Management**: Place orders and manage order status.
- **Secure Routes**: Protect certain routes with authentication middleware.
- **Modular Code Structure**: Organized and scalable project structure for maintainability.

# Technologies Used
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: For secure authentication.

