const { Router, request } = require('express');
const verifyToken = require('../config/userAuth.js');
const IncomeController = require('../controllers/incomeController.js');

const router = Router();

router
    // CREATE
    .post("/incomes", verifyToken, IncomeController.insertIncome)
    // READ
    .get("/incomes", verifyToken, IncomeController.listIncomes)
    .get("/incomes/:year([0-9]{4})", verifyToken, IncomeController.listIncomeByYear)
    .get("/incomes/:year([0-9]{4})/:month([0-9]{2})", verifyToken, IncomeController.listIncomeByMonth)
    .get("/incomes/:id([0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})", verifyToken, IncomeController.listIncomeByID)
    // UPDATE
    .put("/incomes/:id", verifyToken, IncomeController.updateIncome)
    .post("/incomes/:id/restore", verifyToken, IncomeController.restoreIncome)
    // DELETE
    .delete("/incomes/:id", verifyToken, IncomeController.deleteIncome)

module.exports = router;