# Course Hub Server

Welcome to the **Course Hub Server** repository. This Node.js backend
powers the Course Hub e-learning platform, providing course management,
user authentication, secure payments, and admin operations.

## Introduction

The **Course Hub Server** is built using Node.js and MongoDB Atlas and
serves as the backend for an online learning platform. It includes
authentication, course management, cart operations, and payment
processing using Stripe and SSLCommerz.

## Tech Stack

-   Node.js -- Runtime environment
-   Express.js -- Backend web framework
-   MongoDB Atlas -- Cloud NoSQL database
-   Stripe -- International online payment gateway
-   SSLCommerz -- Bangladeshi payment gateway
-   JWT -- Authentication
-   MVC Pattern -- Current architecture
-   Repository Layer (Upcoming)

## Features

-   User Authentication (JWT)
-   Course Management (CRUD)
-   Cart & Enrollment System
-   Stripe & SSLCommerz Payment Integration
-   Admin Feedback and Data Controls
-   Structured MVC Codebase
-   Secure API with environment-based configuration

## Architecture

Current architecture follows MVC:

    src
     ├── routes/        → API route definitions
     ├── controllers/   → HTTP request handlers
     ├── services/      → Business logic
     ├── repositories/  → (Future) Database abstraction layer
     ├── models/        → Database schemas or collections
     ├── config/        → DB & payment configurations
     └── utils/         → Utility modules

## Getting Started

### Prerequisites

-   Node.js
-   npm
-   MongoDB Atlas account
-   Stripe account
-   SSLCommerz merchant account

### Installation

    git clone https://github.com/raihanuldev/course-hub-server.git
    cd course-hub-server
    npm install

## Configuration

### Environment Variables

Create a `.env` file:

    PORT=3000
    MONGODB_URI=your_mongodb_atlas_uri
    STRIPE_SECRET_KEY=your_stripe_secret_key
    SSL_COMMERZ_STORE_ID=your_store_id
    SSL_COMMERZ_STORE_PASSWORD=your_store_password

## Database Setup

This project uses MongoDB Atlas.\
Ensure IP whitelisting and correct connection string.

## Stripe Integration

1.  Create a Stripe account
2.  Retrieve the Secret Key
3.  Add it to `.env`

## SSLCommerz Integration

1.  Create merchant account
2.  Add Store ID & Password to `.env`

## Usage

### Running the Server

    npm start

Development mode:

    npm run dev

## API Endpoints

### Auth

-   POST /auth/register
-   POST /auth/login

### Courses

-   GET /courses
-   POST /courses
-   PUT /courses/:id
-   DELETE /courses/:id

### Cart

-   POST /carts
-   GET /carts?email=
-   DELETE /carts/:id

### Feedback

-   PUT /feedback/:id

### Payments

-   POST /payments/stripe
-   POST /payments/ssl/init
-   POST /payments/ssl/success

## Contributing

### Local Development

1.  Fork repo
2.  Create branch
3.  Commit changes
4.  Open PR to main

## Future Improvements

-   Repository Pattern
-   Standard API Response Format
-   Swagger Docs
-   RBAC
-   Unit Tests

## License

MIT License
