const mongoose = require('mongoose');

const Account = mongoose.model('Account', {
  name: String,
  balance: {
    type: Number,
    default: 0
  }
});

module.exports = Account;
