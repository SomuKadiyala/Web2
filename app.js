$(document).ready(function () {
    // Load transactions on page load
    $.get('/transactions', function (data) {
      displayTransactions(data);
    });
  
    // Handle form submission
    $('#transactionForm').submit(function (event) {
      event.preventDefault();
  
      const formData = $(this).serialize();
  
      $.post('/addTransaction', formData, function (data) {
        alert(data);
        // Reload transactions after adding a new one
        $.get('/transactions', function (data) {
          displayTransactions(data);
        });
      });
    });
  
    // Display transactions on the page
    function displayTransactions(transactions) {
      const transactionList = $('#transactionList');
      transactionList.empty();
  
      transactions.forEach(function (transaction) {
        const typeColor = transaction.type === 'income' ? 'green' : 'red';
        const transactionHTML = `
          <div class="transaction" style="border-color: ${typeColor};">
            <p><strong>Description:</strong> ${transaction.description}</p>
            <p><strong>Amount:</strong> ${transaction.amount}</p>
            <p><strong>Type:</strong> ${transaction.type}</p>
            <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleString()}</p>
          </div>
        `;
  
        transactionList.append(transactionHTML);
      });
    }
  });
  