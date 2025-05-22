let expenses = [];

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

function addExpense() {
    const category = document.getElementById('category').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!category || isNaN(amount) || amount <= 0) {
        showNotification('Please enter valid category and amount', 'error');
        return;
    }

    expenses.push({ category, amount });
    updateTable();
    clearInputs();
    document.getElementById('results').style.display = 'none';
    showNotification(`Successfully added ${category} expense`);
}

function clearInputs() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function updateTable() {
    const tbody = document.getElementById('expenseList');
    tbody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount.toLocaleString()}</td>
            <td><button onclick="deleteExpense(${index})" style="background-color: #dc3545;">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

function deleteExpense(index) {
    const deletedExpense = expenses[index];
    expenses.splice(index, 1);
    updateTable();
    document.getElementById('results').style.display = 'none';
    showNotification(`Successfully deleted ${deletedExpense.category} expense`);
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

// Add initial expenses
const initialExpenses = [
    { category: 'Groceries', amount: 15000 },
    { category: 'Rent', amount: 40000 },
    { category: 'Transportation', amount: 5000 },
    { category: 'Entertainment', amount: 10000 },
    { category: 'Communication', amount: 2000 },
    { category: 'Gym', amount: 3000 }
];

expenses = initialExpenses;
updateTable(); 