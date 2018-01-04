const Account = require('../models').Account;

const listAllAccounts = (req, res) => {
  const startTime = Date.now();
  Account.find({}, (error, results) => {
    const endTime = Date.now();
    console.log("Finished Loading all Accounts within " + (endTime - startTime) + " ms");
    res.status(200).send(results);
  });
};

const createAccount = (req, res) => {
  const startTime = Date.now();
  let newAccount = new Account(req.body);
  newAccount.save((error, result) => {
    const endTime = Date.now();
    console.log("Finished Adding new Account within " + (endTime - startTime) + " ms");
    res.status(200).send(result);
  });
};

const updateAccount = (req, res) => {
  const startTime = Date.now();
  Account.findById(req.params.id, (error, account) => {
    Object.assign(account, req.body);
    account.save((error, result) => {
      const endTime = Date.now();
      console.log("Finished Updating target Account within " + (endTime - startTime) + " ms");
      res.status(201).send(result);
    });
  });
};

const deleteAccount = (req, res) => {
  const startTime = Date.now();
  Account.remove({
    _id: req.params.id
  }, (error, account) => {
    const endTime = Date.now();
    console.log("Finished removing target Account within " + (endTime - startTime) + " ms");
    res.status(204).send();
  });
};

module.exports = {
  'listAll':listAllAccounts,
  'create':createAccount,
  'update':updateAccount,
  'delete':deleteAccount
};
