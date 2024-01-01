
### UserAPI - A Simple User Management System
##Introduction
Welcome to UserAPI, a straightforward and efficient user management system designed to handle user data seamlessly. 


## Getting Started => https://new-userapi.onrender.com/index.html
## API Endpoints
Base URL
https://new-userapi.onrender.com/api/v1/users

# Endpoints
Get All Users
GET /
Retrieves a list of all users.

# Get User by ID
GET /:id
Retrieves a specific user by their ID.

# Create New User
POST /
Creates a new user. (req.body => {"name": "","email": ""})

# Update User
PUT /:id
Updates an existing user's information by ID.

# Delete User
DELETE /:id
Deletes a user by ID.