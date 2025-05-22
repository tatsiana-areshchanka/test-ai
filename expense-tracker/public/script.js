let expenses = [];

// API Functions
async function fetchExpenses() {
    try {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        expenses = data;
        updateTable();
    } catch (error) {
        showNotification('Error fetching expenses', 'error');
    }
}

async function addExpense() {
    const category = document.getElementById('category').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!category || isNaN(amount) || amount <= 0) {
        showNotification('Please enter valid category and amount', 'error');
        return;
    }

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, amount })
        });

        if (!response.ok) {
            throw new Error('Failed to add expense');
        }

        const newExpense = await response.json();
        expenses.push(newExpense);
        updateTable();
        clearInputs();
        document.getElementById('results').style.display = 'none';
        showNotification(`Successfully added ${category} expense`);
    } catch (error) {
        showNotification('Error adding expense', 'error');
    }
}

async function deleteExpense(id) {
    try {
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }

        expenses = expenses.filter(expense => expense._id !== id);
        updateTable();
        document.getElementById('results').style.display = 'none';
        showNotification('Successfully deleted expense');
    } catch (error) {
        showNotification('Error deleting expense', 'error');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

function clearInputs() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function updateTable() {
    const tbody = document.getElementById('expenseList');
    tbody.innerHTML = '';

    // Expenses are already sorted by categoryId from the server
    expenses.forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount.toLocaleString()}</td>
            <td><button onclick="deleteExpense('${expense._id}')" style="background-color: #dc3545;">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

function calculateExpenses() {
    if (expenses.length === 0) {
        showNotification('Please add some expenses first', 'error');
        return;
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageDaily = total / 30;

    // Sort expenses by amount in descending order
    const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
    const top3 = sortedExpenses.slice(0, 3);

    // Update results
    document.getElementById('totalExpenses').textContent = total.toLocaleString();
    document.getElementById('averageDaily').textContent = averageDaily.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';
    top3.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toLocaleString()}`;
        topExpensesList.appendChild(li);
    });

    document.getElementById('results').style.display = 'block';
    showNotification('Calculations completed successfully');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchExpenses();
}); 