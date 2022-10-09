const { Router, request } = require('express');
const verifyToken = require('../config/userAuth.js');
const ExpenseController = require('../controllers/expenseController.js');

const router = Router();

router
    // CREATE
    .post("/expenses", verifyToken, ExpenseController.insertExpense)
    // READ
    .get("/expenses", verifyToken, ExpenseController.listExpenses)
    .get("/expenses/:year([0-9]{4})", verifyToken, ExpenseController.listExpenseByYear)
    .get("/expenses/:year([0-9]{4})/:month([0-9]{2})", verifyToken, ExpenseController.listExpenseByMonth)
    .get("/expenses/:id([0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})", verifyToken, ExpenseController.listExpenseByID)
    // UPDATE
    .put("/expenses/:id", verifyToken, ExpenseController.updateExpense)
    .post("/expenses/:id/restore", verifyToken, ExpenseController.restoreExpense)
    // DELETE
    .delete("/expenses/:id", verifyToken, ExpenseController.deleteExpense)

module.exports = router;