const express = require('express');
const incomes = require('./incomesRoutes.js');
const expenses = require('./expensesRoutes.js');
const summary = require('./summaryRoutes.js');
const user = require('./userRoutes.js');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: "Sucesso!"});
    })

    app.use(
        express.json(),
        incomes,
        expenses,
        summary,
        user
    )
}

module.exports = routes;