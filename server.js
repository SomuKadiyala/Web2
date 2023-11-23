const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneyTrackerDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// Create a transaction schema
const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  type: String, // 'income' or 'expense'
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/transactions', (req, res) => {
  Transaction.find({}, (err, transactions) => {
    if (err) {
      console.error(err);
      res.send('Error retrieving transactions.');
    } else {
      res.json(transactions);
    }
  });
});

app.post('/addTransaction', (req, res) => {
  const newTransaction = new Transaction({
    description: req.body.description,
    amount: req.body.amount,
    type: req.body.type
  });

  newTransaction.save((err) => {
    if (err) {
      console.error(err);
      res.send('Error adding transaction.');
    } else {
      res.send('Transaction added successfully.');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000);

});
