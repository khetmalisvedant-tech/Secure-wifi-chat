# Secure Wi-Fi Chat

A full-stack secure Wi-Fi and chat management system built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time communication. This project enables secure user authentication, real-time messaging, and an operator dashboard for managing users and monitoring chat activity.

## Features

- **Real-time Chat**: Instant messaging between users and operators using Socket.io.
- **Secure Authentication**: User registration and login with secure password hashing (bcrypt) and JWT authentication.
- **Operator Dashboard**: Dedicated interface for operators to monitor online users and manage the system.
- **Wi-Fi Management**: (Planned/In-progress) Features for managing secure Wi-Fi access.
- **Responsive Design**: Frontend built with React and styled for a modern user experience.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: React.js
- **Real-time Communication**: Socket.io
- **Styling**: CSS / Tailwind CSS

## Project Structure

- **`/` (Root)**: Backend server code (`server.js`), API routes, models, and controllers.
- **`/client`**: Main user-facing React application (Chat interface).
- **`/operator-dashboard`**: React application for the operator dashboard.
- **`/frontend`**: Additional frontend components/pages (Authentication/Landing).

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/khetmalisvedant-tech/Secure-wifi-chat.git
    cd Secure-wifi-chat
    ```

2.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to each frontend directory and install dependencies:
    ```bash
    cd client
    npm install
    cd ../operator-dashboard
    npm install
    cd ../frontend
    npm install
    cd ..
    ```

4.  **Environment Configuration:**
    Create a `.env` file in the root directory and add your configuration:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

## Running the Application

### 1. Start the Backend Server
From the root directory:
```bash
npm start
# OR for development with nodemon
npm run dev
```
The server will run on `http://localhost:5000`.

### 2. Start the Client Application
Open a new terminal, navigate to `/client`, and run:
```bash
cd client
npm start
```
The client app will run on `http://localhost:3000`.

### 3. Start the Operator Dashboard
Open a new terminal, navigate to `/operator-dashboard`, and run:
```bash
cd operator-dashboard
npm start
```
The dashboard will run on `http://localhost:3001` (or another available port).

## API Endpoints

- **Auth**:
    - `POST /api/auth/register`: Register a new user.
    - `POST /api/auth/login`: Login user.
- **Chat**:
    - Socket.io events for real-time messaging.

## License

This project is licensed under the ISC License.
