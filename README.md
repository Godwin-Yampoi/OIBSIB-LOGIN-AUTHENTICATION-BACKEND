# OIBSIB-LOGIN-AUTHENTICATION-BACKEND
This is a node.js project that allows users to register and login

# Dependencies

express
mongoose
body-parser
bcrypt
cors
validator
Features:

# User Registration: 
Creates a new user in the MongoDB database.
User Login: Validates user credentials and responds with a success message.
Database:

Uses MongoDB to store user data.
# API Endpoints:

POST /register: Registers a new user. Requires username, email, and password in the request body.
POST /login: Logins a user. Requires email and password in the request body.
# Error Handling:

Returns informative error messages for various scenarios like invalid email format, user already exists, and incorrect login credentials.
# Security:

Hashes user passwords using bcrypt before storing them in the database.
# Running the application:

Create a .env file in the project root directory and add PORT variable with your desired port number (defaults to 3001).
# Install dependencies: 
npm install
# Start the server:
 node server.js (replace server.js with your actual file name)