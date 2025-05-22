# Expense Tracker Light

A lightweight frontend-only version of the expense tracker application, built with vanilla HTML, CSS, and JavaScript.

## Features

- Add and delete expenses
- Calculate total expenses
- Calculate average daily expenses
- Display top 3 largest expenses
- Responsive design
- Local storage for data persistence

## Project Structure

```
expense-tracker-light/
├── index.html
├── styles.css
└── script.js
```

## Expense Categories

The application uses the following predefined categories (in order by ID):

1. Groceries
2. Rent
3. Transportation
4. Entertainment
5. Communication
6. Gym

## Setup Instructions

1. Clone the repository
2. Navigate to the expense-tracker-light directory:
   ```bash
   cd expense-tracker-light
   ```

3. Open `index.html` in your web browser:
   - Double-click the file
   - Or use a local development server

## Usage

1. Add an expense:
   - Enter the expense category
   - Enter the amount
   - Click "Add Expense"

2. Delete an expense:
   - Click the delete button next to the expense

3. View statistics:
   - Total expenses
   - Average daily expenses
   - Top 3 largest expenses

## Data Storage

The application uses the browser's localStorage to persist data between sessions. This means:
- Data is stored locally in your browser
- Data persists even after closing the browser
- Data is specific to the browser you're using
- Data is not synchronized across different devices

## Browser Compatibility

The application works in all modern browsers that support:
- ES6 JavaScript
- localStorage API
- CSS Grid and Flexbox

## Development

To modify the application:

1. Edit `index.html` for structure changes
2. Edit `styles.css` for styling changes
3. Edit `script.js` for functionality changes

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 