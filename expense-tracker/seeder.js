const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected for seeding'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Expense Schema
const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Initial data with sequential timestamps
const baseDate = new Date();
const initialExpenses = [
    { category: 'Groceries', amount: 15000, createdAt: new Date(baseDate.getTime() + 1000) },
    { category: 'Rent', amount: 40000, createdAt: new Date(baseDate.getTime() + 2000) },
    { category: 'Transportation', amount: 5000, createdAt: new Date(baseDate.getTime() + 3000) },
    { category: 'Entertainment', amount: 10000, createdAt: new Date(baseDate.getTime() + 4000) },
    { category: 'Communication', amount: 2000, createdAt: new Date(baseDate.getTime() + 5000) },
    { category: 'Gym', amount: 3000, createdAt: new Date(baseDate.getTime() + 6000) }
];

// Seeding function
async function seedDatabase() {
    try {
        // Check if database is empty
        const count = await Expense.countDocuments();
        
        if (count === 0) {
            console.log('Database is empty. Seeding initial data...');
            
            // Insert initial data
            await Expense.insertMany(initialExpenses);
            console.log('Initial data seeded successfully!');
        } else {
            console.log('Database already contains data. Skipping seeding.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

// Run the seeder
seedDatabase(); 