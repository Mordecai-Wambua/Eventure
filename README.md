# Eventure: Event Management Web Application

Eventure is a full stack web application for managing events, attendees, and ticket bookings. It provides functionality for users to book events, view event details, and update or manage event information as organizers.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Create and Manage Events**: Organizers can create, update, and delete events.
- **Book Tickets**: Attendees can book tickets for events, ensuring no duplicate bookings.
- **Check Event Capacity**: Automatically handle event capacity and prevent overbooking.
- **View Events**: Retrieve details for any event.
- **Organizer Management**: Track event organizers and ensure only authorized changes.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (optional, if used)
- **Others**:
  - MongoDB Atlas (for cloud database hosting, optional)
  - bcrypt (for password hashing, if you have user authentication)

## Setup and Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from [here](https://nodejs.org/).
- **MongoDB**: Install MongoDB locally or use MongoDB Atlas for cloud hosting.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Mordecai-Wambua/Eventure.git
   cd Eventure
   ```

2. **Install Dependencies**

   ```bash
   # For the frontend
   cd client
   npm install

   # For the backend
   cd server
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root of the project and add the following variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Run the Server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Running in Development Mode

You can also run the server using `nodemon` for live reloading during development:

```bash
npm run dev
```

## Usage

You can use an API client like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API.

### Example: Booking an Event

```bash
POST /events/:id/book
{
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

### Example: Updating an Event

```bash
PUT /api/organizer/event/:id
{
  "title": "New Event Title",
  "description": "Updated event description",
  "date": "2024-10-24",
  "venue": "New Venue",
  "maxAttendees": 100
}
```

## API Endpoints

### Event Management

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | `/api/organizerevents`     | Create a new event |
| GET    | `/api/organizer/event/:id` | Get event details  |
| PUT    | `/api/organizer/event/:id` | Update an event    |
| DELETE | `/api/organizer/event/:id` | Delete an event    |

### Booking Tickets

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | `/events/:id/book` | Book a ticket for an event |

### Organizer Management

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| GET    | `/events` | Get events by organizer |

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
