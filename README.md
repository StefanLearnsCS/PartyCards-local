# PartyCards

#### A web application that allows users to quickly and easily create their own party/drinking card games and discover new games to play on the weekends.

## Introduction
#### PartyCards is designed for anyone who loves party and drinking games. It simplifies the process of creating custom card games like Sociables while allowing users to explore new games created by other users. Whether it's a game for a big party or a small gathering, PartyCards offers endless fun.

## Features

* Create Custom Games: Design your own party card game.
* Discover Games: Browse and find card packs made by other players.
* Bookmarking: Find bookmarked games on user profile page.
* Commenting and Rating: Like fun games, and share funny stories in the comment section.
* User Authentication: Sign in using Google or create an account manually.
* Contact Us: Users can contact PartyCards directly using the Contact tab on the homepage.
* Responsive Design: Optimized for mobile and desktop devices.

## Technologies

* Frontend: React, React Bootstrap
* Backend: Express.js, Node.js
* Database: MySQL
* ORM: Sequelize
* Form Handling: Formik, Yup
* Hosting: Netlify (Frontend), Heroku (Backend)

## Getting Started

### Prerequisites

#### Make sure you have the following installed:

* Node.js (version 14.x or above)
* MySQL
* Git

### Installation 

```bash

# Clone the repository
git clone https://github.com/your-username/PartyCards-local.git

# Navigate to the project directory:
cd partycards-local


# Navigate to backend and install packages:
cd server/
npm install

# Navigate to frontend and install packages:
cd ..
cd client/
npm install

# Setup enviornment variables in a .env file in server, i.e.
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
userPasses=yourpassword

# Configure your database in server/config/config.json

# Start application in /server and /client

cd server/
npm start

cd client/
npm start

```

## Usage

### Once the app is running:

#### You can access the frontend at: http://localhost:3000
#### The backend API will be accessible at: http://localhost:3001

## API Routes
* POST /api/cards: Posts individual cards associated with a pack.
* GET /api/cards/:packId: Fetches cards associated with a pack id.
* POST /api/comments: Creates a new comment associated with a pack.
* GET /api/comments/:packId: Fetches comments associated to a pack.
* DELETE /api/comments/:commentId: Deletes a comment by ID.
* POST /api/contact: Sends contact message from user to database.
* POST /api/likes: Applies a "like" or "unlike" to user pack.
* POST /api/auth: Registers a new user.
* POST /api/auth/login: Matches user information to database, and returns token.
* GET /api/auth/google: Handles Google login functionality.
* GET /api/auth/google/callback: Gives google login user token.
* GET /api/auth/auth: Validates user token.
* GET /api/auth/basicinfo/:id: Find basic information about user.
* GET /api/posts: Gets all posted packs.
* GET /api/posts/byId/:id: Gets individual pack by ID.
* POST /api/posts: Posts a new card pack.
* DELETE /api/posts/:postId: Delete individual pack.
* GET /api/posts/byuserId/:id: Fetches packs by specific users.

## Contributing
### Contributions are welcome! To contribute:

#### Fork the project.
* Create your feature branch (git checkout -b feature/feature-name).
* Commit your changes (git commit -m 'Add some feature').
* Push to the branch (git push origin feature/feature-name).
* Open a pull request.