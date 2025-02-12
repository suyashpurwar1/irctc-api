
# **IRCTC-like Railway Management System**

This project is a backend API for a railway management system similar to IRCTC. It allows users to check train availability, book seats, and manage trains (for admins). The system is built using **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**.

---

## **Table of Contents**
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [API Endpoints](#api-endpoints)
5. [Sample Data](#sample-data)
6. [Testing the APIs](#testing-the-apis)
7. [Handling Race Conditions](#handling-race-conditions)
8. [Assignment Requirements](#assignment-requirements)
9. [Contributing](#contributing)

---

## **Features**
- **User Registration and Login**: Users can register and log in to the system.
- **Role-Based Access Control**:
  - **Admin**: Can add new trains and update train details.
  - **User**: Can check seat availability, book seats, and view booking details.
- **Real-Time Seat Availability**: Users can check the number of available seats between two stations.
- **Seat Booking**: Users can book seats on available trains.
- **Race Condition Handling**: Ensures that only one user can book seats at a time to prevent overbooking.

---

## **Tech Stack**
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: Dotenv

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js (v16 or higher)
- PostgreSQL (installed and running)
- Git (optional)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/irctc-api.git
cd irctc-api
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Set Up the Database**
1. Update the `.env` file with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/irctc_db"
   JWT_SECRET="your_jwt_secret_key"
   ```

2. Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

### **5. Start the Server**
```bash
node src/index.js
```

The server will start at `http://localhost:3000`.

---

## **API Endpoints**

### **1. Authentication**
- **Register a User**
  ```bash
  POST /auth/register
  ```

- **Login User**
  ```bash
  POST /auth/login
  ```
  

---

### **2. Trains (Admin Only)**
- **Add a New Train**
  ```bash
  POST /trains
  ```

---

### **3. Seat Availability**
- **Get Seat Availability**
  ```bash
  GET /availability?source=Lucknow&destination=Varanasi
  ```

---

### **4. Bookings**
- **Book a Seat**
  ```bash
  POST /bookings/book
  ```

- **Get Booking Details**
  ```bash
  GET /bookings/:id
  ```
  



## **Testing the APIs**
1. Use **Postman** or **cURL** to test the endpoints.
2. Start by registering users and logging in to get JWT tokens.
3. Use the admin token to add trains.
4. Use the user token to check seat availability and book seats.

---

## **Handling Race Conditions**
The system uses **database transactions with row-level locking** to handle race conditions during seat booking. This ensures that only one user can book seats at a time, preventing overbooking.

---

## **Requirements**
This project fulfills the following requirements:
1. **User Registration and Login**: Implemented with JWT authentication.
2. **Role-Based Access Control**: Admins can add trains, and users can book seats.
3. **Real-Time Seat Availability**: Users can check available seats between two stations.
4. **Seat Booking**: Users can book seats if available.
5. **Race Condition Handling**: Ensures that only one user can book seats at a time.
6. **API Key Protection**: Admin endpoints are protected using JWT tokens.

---
