# CropConnect Backend/Server side

Step 1 -> User registration (UserModel)

Step 2 -> Profile creation based on role (BuyerProfile, FarmerProfile)

Step 3 -> Farmers are allowed to add_product on platform that he/she wants to sell

Step 4 -> Buyers are allowed to place_order of the product that was add by Farmers

# CropConnect platform for connecting farmers with Buyers

A robust backend API built with [Tech Stack, e.g., Node.js + Express, etc.].

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Gitignore Variables](#gitignore-variables)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)

---

## Features

- RESTful API's / endpoints
- JWT Authentication
- Input validation
- Modular route/controller architecture
- Error handling middleware
- Environment config support

---

## Tech Stack

- **Language:** [Node.js]
- **Framework:** [Express.js]
- **Database:** [MongoDB, Redis, etc.]

---

## Getting Started

### Prerequisites

- Node.js, Redis, Mongodb, etc.
- [Package Manager] (e.g., npm)

### Installation

```
git clone your_repo_link
cd CropConnect-
npm install

```

### Run Locally

```
npm run start
```

## Environment Variables

```
MONGODB_URI = your_mongodb_database_connection_string
PORT = 3000 || 8080
JWT_SECRET = your_jwt_secret
GOOGLE_PASSWORD = your_google_app_password
GOOGLE_EMAIL = your_google_email_address

```

### Authentication Header

All protected routes require a **Bearer token**

## Gitignore Variables

node_modules/ #by default huge node module files and folders
.env #confidential environment variables

## API Documentation

### Base URL

```
http://localhost:8080

```
### User Routes (`/user`)

| Method | Endpoint  | Description                       |
|--------|-----------|-----------------------------------|
| POST   | `/signup` | Register a new user account       |
| POST   | `/signin` | Authenticate user and return JWT  |
| POST   | `/logout` | User logout from platform         |
| POST   | `/forgetPassword/?token= createdToken` | user received password reset link via mail|
| POST   | `/resetPassword` | Follow the same link to reset password |
---

### Farmer_Profile Creation Routes (`/farmerProfile`)

| Method | Endpoint               | Description                              |
|--------|------------------------|------------------------------------------|
| POST   | `/add-farmerProfile`   | Create a new profile for a farmer        |
| PATCH  | `/update-farmerProfile`| Update existing farmer profile details   |
| GET    | `/get-farmerProfile`   | Retrieve the profile of the logged-in farmer |

---

### Buyer_Profile Profile Routes (`/buyerProfile`)

| Method | Endpoint                | Description                              |
|--------|-------------------------|------------------------------------------|
| POST   | `/add-buyerProfile`     | Create a new profile for a buyer         |
| PATCH  | `/update-buyerProfile`  | Update existing buyer profile details    |
| GET    | `/get-buyerProfile`     | Retrieve the profile of the logged-in buyer |

---

### Add_Product_By_Farmer Routes (`/addProductByFarmer`)

| Method | Endpoint                           | Description                                               |
|--------|------------------------------------|-----------------------------------------------------------|
| POST   | `/add-productByFarmer`             | Allow farmers to list a new product for sale             |
| PATCH  | `/update-productByFarmer/:productID`| Update details of a specific product listed by the farmer |
| DELETE | `/delete-productByFarmer/:productID`| Delete a specific product listed by the farmer            |
| GET    | `/get-productByFarmer`             | Retrieve all products listed for sale by the farmer       |

---

### Place_Order_Of_Product that wansts to buy by Role: buyer Routes (`/orderProduct`)

| Method | Endpoint                                                                                   | Description                                                                 |
|--------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| POST   | `/orderProduct?buyerId=buyerId&farmerId=farmerId&productId=productId`                      | Place an order for a product listed by a farmer                            |
| PATCH  | `/updateProduct?orderId=_id`                                                               | Update details of an existing product order                                |
| DELETE | `/cancelOrder?orderId=_id`                                                                 | Cancel an existing product order                                           |
| GET    | `/getOrderedProduct`                                                                       | Retrieve all product orders placed by the buyer                            |

---

### Applied Express Rate Limiter  
Limits each IP to a maximum of 25 requests within a 15-minute window to prevent abuse and ensure fair usage.

## Folder Structure
```
├──Backend
    ├── Config/
    | ├── db.js/
    | ├── redis.js/
    ├── Controllers/
    | ├── user.controllers.js
    ├── Middlewares/
    | ├── auth.middleware.js
    ├── Models/
    | ├── addProductByFarmer.model.js
    | ├── blacklistedToken.model.js
    | ├── buyerProfile.model.js
    | ├── farmerProfile.model.js
    | ├── orderProduct.model.js
    | ├── user.model.js
    ├── Routes/
    | ├── addProductByFarmer.routes.js
    | ├── buyerProfile.routes.js
    | ├── farmerProfile.routes.js
    | ├── orderProduct.routes.js
    | ├── user.routes.js
    ├── .env
    ├── .gitignore
    ├── Backend.note.txt
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── server.js
```