const database = require('../db/models/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ExpenseController {

    // CREATE
    static async insertExpense(req, res) {
        const newExpense = req.body;

        const dateExpenses = await database.Expenses.findAll(
            { where:
                { date:         { [Op.gte]: Sequelize.fn('DATE', newExpense.date, 'start of month'),
                                  [Op.lte]: Sequelize.fn('DATE', newExpense.date, 'start of month', '+1 month', '-1 day') },
                  description:    newExpense.description
                }
            });

        if (dateExpenses.length === 0) {
            try {
                const createdNewExpense = await database.Expenses.create(newExpense);
                return res.status(200).json(createdNewExpense);
                } catch (error) {
                return res.status(500).json(error.message);
            }
        } else {
            return res.status(400).json({ "message": "Despesa duplicada, não é possível inserir!" })
        }
        
    }

    static async restoreExpense(req, res) {
        const { id } = req.params;
        try {
            await database.Expenses.restore({ where: { id: id } });
            return res.status(200).json({ message: `Despesa de ID ${id} restaurada!` });
        } catch (error) {
            return res.status(500).json(error.message);
    }}

    // READ
  
    static async listExpenses(req, res) {

        const desc = (typeof req.query.desc === 'string') ? req.query.desc : 0;

        if (typeof desc === 'string') {
            try {
                const expenses = await database.Expenses.findAll({ where: { description: { [Op.like]: desc } }});

                if (expenses.length > 0) {
                    return res.status(200).json(expenses);
                } else {
                    return res.status(400).json({ "message": "Nenhum registro encontrado!" });
                }

            } catch (error) {
                return res.status(500).json(error.message);
        }}

        if (desc === 0) {
            try {
                const expenses = await database.Expenses.findAll();

                if (expenses.length > 0) {
                    return res.status(200).json(expenses);
                } else {
                    return res.status(400).json({ "message": "Nenhum registro encontrado!"});
                }

            } catch (error) {
                return res.status(500).json(error.message);
        }}
    }

    static async listExpenseByID(req, res) {
        const { id } = req.params;
        try {
            const expenses = await database.Expenses.findOne({ where: { id: id } });
            return res.status(200).json(expenses);
        } catch (error) {
            return res.status(500).json(error.message);
    }}

    static async listExpenseByMonth(req, res) {
        const date = req.params.year + '-' + req.params.month + '-' + '01';

        const monthExpenses = await database.Expenses.findAll(
            { where:
                { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                          [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') }
                }
            });

        if (monthExpenses.length > 0) {
            try {
                return res.status(200).json(monthExpenses);
            } catch (error) {
                return res.status(500).json(error.message);
            }
        } else {
            return res.status(400).json({ "message": "Nenhum registro encontrado." });
    }}

    static async listExpenseByYear(req, res) {
        const year = req.params.year + '-01-01';

        try {
            const yearExpenses = await database.Expenses.findAll(
                { where:
                    { date: { [Op.gte]: Sequelize.fn('DATE', year, 'start of year'),
                              [Op.lte]: Sequelize.fn('DATE', year, 'start of year', '+1 year', '-1 day') }
                    }
                });
            if (yearExpenses.length > 0) {
                return res.status(200).json(yearExpenses);
            } else {
                return res.status(400).json({ "message": "Nenhum registro encontrado!" });
            }
        } catch (error) {
            return res.status(500).json(error.message);
    }}

    // UPDATE
    static async updateExpense(req, res) {
        const { id } = req.params;
        const newParams =  req.body;
        
        try {
            const toUpdate = await database.Expenses.findOne({ where: { id: id } })

            try {
                const descExpenses = (typeof newParams.description !== 'undefined' && typeof newParams.description !== 'null') ? await database.Expenses.findOne(
                { where:
                    { date:         { [Op.gte]: Sequelize.fn('DATE', toUpdate.date, 'start of month'),
                                      [Op.lte]: Sequelize.fn('DATE', toUpdate.date, 'start of month', '+1 month', '-1 day') },
                      description:    newParams.description,
                      id: { [Op.ne]: toUpdate.id }
                }}) : null;

                if (!!descExpenses) {
                    return res.status(400).json({ "message": "Descrição duplicada, impossível atualizar!"});
                } else {
                    try {

                        const dateExpenses = (typeof toUpdate.description !== 'undefined' && typeof toUpdate.description !== 'null') ? await database.Expenses.findAll(
                            { where:
                                { date:         { [Op.gte]: Sequelize.fn('DATE', newParams.date, 'start of month'),
                                                  [Op.lte]: Sequelize.fn('DATE', newParams.date, 'start of month', '+1 month', '-1 day') },
                                description:      toUpdate.description,
                                id: { [Op.ne]: toUpdate.id }
                                }
                            }) : [];

                        if (dateExpenses.length > 0) {
                            return res.status(400).json({ "message": "Descrição duplicada ou vazia, impossível atualizar!"});
                        } else {
                            try {
                                await database.Expenses.update(newParams, { where: { id: id } });
                                const expenseUpdated = await database.Expenses.findOne({ where: { id: id } });

                                return res.status(200).json(expenseUpdated);
                            } catch (error) {
                                return res.status(500).json(error.message);
                        }}
                        } catch (error) {
                            return res.status(500).json(error.message);
                }}
            } catch (error) {
                return res.status(500).json(error.message);
        }} catch (error) {
            return res.status(500).json(error.message);
        }
    }   

    // DELETE
    static async deleteExpense(req, res) {
        const { id } = req.params;
        try {
            await database.Expenses.destroy({ where: { id: id } });
            return res.status(200).json({ "message": `Despesa de ID ${id} excluída!` });
        } catch (error) {
            return res.status(500).json(error.message);
    }}

}

module.exports = ExpenseController;