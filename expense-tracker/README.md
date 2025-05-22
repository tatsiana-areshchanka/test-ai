# Expense Tracker Application

A full-stack web application for tracking and analyzing monthly expenses. Built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- Add and delete expenses
- Calculate total expenses
- Calculate average daily expenses
- Display top 3 largest expenses
- Real-time notifications
- Data persistence with MongoDB
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

## Database Setup

### Local MongoDB Installation (Ubuntu/Debian)

1. Import MongoDB public GPG key:
```bash
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
   --dearmor
```

2. Create list file for MongoDB:
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

3. Update package list and install MongoDB:
```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```

4. Start MongoDB service:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

5. Verify MongoDB is running:
```bash
sudo systemctl status mongod
```

## Database Seeding

The application comes with a seeder script to populate the database with initial data. The seeder will only add data if the database is empty.

### Running the Seeder

1. Basic seeding:
```bash
npm run seed
```

2. Clear database and seed (if you want to reset the data):
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use expense-tracker

# Clear the expenses collection
db.expenses.deleteMany({})

# Exit MongoDB shell
exit

# Run the seeder
npm run seed
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Stopping the Application

1. Stop the Node.js server:
   - Press `Ctrl + C` in the terminal where the server is running
   - This will gracefully shut down the Node.js process

2. Stop MongoDB (if needed):
```bash
sudo systemctl stop mongod
```

3. If you need to check if the server is still running:
```bash
ps aux | grep node
```

4. If you need to forcefully stop the server (if Ctrl+C doesn't work):
```bash
pkill node
```

## Database Exploration

### Using MongoDB Shell

1. Connect to MongoDB:
```bash
mongosh
```

2. Switch to the application database:
```bash
use expense-tracker
```

3. View all expenses:
```bash
db.expenses.find()
```

4. Count total expenses:
```bash
db.expenses.countDocuments()
```

5. Find expenses by category:
```bash
db.expenses.find({ category: "Groceries" })
```

6. Find expenses above a certain amount:
```bash
db.expenses.find({ amount: { $gt: 10000 } })
```

7. Sort expenses by amount:
```bash
db.expenses.find().sort({ amount: -1 })
```

## API Endpoints

The application provides the following REST API endpoints:

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add new expense
- `DELETE /api/expenses/:id` - Delete an expense

## Project Structure

```
expense-tracker/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── seeder.js
├── package.json
└── README.md
```

## Troubleshooting

1. If MongoDB fails to start:
```bash
sudo systemctl status mongod
sudo journalctl -u mongod
```

2. If the application can't connect to MongoDB:
- Check if MongoDB is running
- Ensure MongoDB service is active
- Check MongoDB logs for errors

3. If the seeder fails:
- Ensure MongoDB is running
- Check database permissions
- Try clearing the database and running the seeder again

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 