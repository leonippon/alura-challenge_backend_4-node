const database = require('../db/models/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class IncomeController {

    // CREATE
    static async insertIncome(req, res) {
        const newIncome = req.body;

        const dateIncomes = await database.Incomes.findAll(
            { where:
                { date:         { [Op.gte]: Sequelize.fn('DATE', newIncome.date, 'start of month'),
                                  [Op.lte]: Sequelize.fn('DATE', newIncome.date, 'start of month', '+1 month', '-1 day') },
                  description:    newIncome.description
                }
            });

        if (dateIncomes.length === 0) {
            try {
                const createdNewIncome = await database.Incomes.create(newIncome);
                return res.status(200).json(createdNewIncome);
                } catch (error) {
                return res.status(500).json(error.message);
            }
        } else {
            return res.status(400).json({ "message": "Receita duplicada, não é possível inserir!" })
        }
        
    }

    static async restoreIncome(req, res) {
        const { id } = req.params;
        try {
            await database.Incomes.restore({ where: { id: id } });
            return res.status(200).json({ message: `Receita de ID ${id} restaurada!` });
        } catch (error) {
            return res.status(500).json(error.message);
    }}

    // READ
  
    static async listIncomes(req, res) {
        const desc = (typeof req.query.desc === 'string') ? req.query.desc : 0;

        if (typeof desc === 'string') {
            try {
                const incomes = await database.Incomes.findAll({ where: { description: { [Op.like]: desc } }});

                if (incomes.length > 0) {
                    return res.status(200).json(incomes);
                } else {
                    return res.status(400).json({ "message": "Nenhum registro encontrado!" });
                }

            } catch (error) {
                return res.status(500).json(error.message);
        }}

        if (desc === 0) {
            try {
                const incomes = await database.Incomes.findAll();

                if (incomes.length > 0) {
                    return res.status(200).json(incomes);
                } else {
                    return res.status(400).json({ "message": "Nenhum registro encontrado!"});
                }

            } catch (error) {
                return res.status(500).json(error.message);
        }}
    }

    static async listIncomeByID(req, res) {
        const { id } = req.params;
        try {
            const incomes = await database.Incomes.findOne({ where: { id: id } });
            return res.status(200).json(incomes);
        } catch (error) {
            return res.status(500).json(error.message);
    }}

    static async listIncomeByMonth(req, res) {
        const date = req.params.year + '-' + req.params.month + '-' + '01';

        const monthIncomes = await database.Incomes.findAll(
            { where:
                { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                          [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') }
                }
            });

        if (monthIncomes.length > 0) {
            try {
                return res.status(200).json(monthIncomes);
            } catch (error) {
                return res.status(500).json(error.message);
            }
        } else {
            return res.status(400).json({ "message": "Nenhum registro encontrado." });
    }}

    static async listIncomeByYear(req, res) {
        const year = req.params.year + '-01-01';

        try {
            const yearIncomes = await database.Incomes.findAll(
                { where:
                    { date: { [Op.gte]: Sequelize.fn('DATE', year, 'start of year'),
                              [Op.lte]: Sequelize.fn('DATE', year, 'start of year', '+1 year', '-1 day') }
                    }
                });
            if (yearIncomes.length > 0) {
                return res.status(200).json(yearIncomes);
            } else {
                return res.status(400).json({ "message": "Nenhum registro encontrado!" });
            }
        } catch (error) {
            return res.status(500).json(error.message);
    }}

    // UPDATE
    static async updateIncome(req, res) {
        const { id } = req.params;
        const newParams =  req.body;
        
        try {
            const toUpdate = await database.Incomes.findOne({ where: { id: id } })

            try {
                const descIncomes = (typeof newParams.description !== 'undefined' && typeof newParams.description !== 'null') ? await database.Incomes.findOne(
                { where:
                    { date:         { [Op.gte]: Sequelize.fn('DATE', toUpdate.date, 'start of month'),
                                      [Op.lte]: Sequelize.fn('DATE', toUpdate.date, 'start of month', '+1 month', '-1 day') },
                      description:    newParams.description,
                      id: { [Op.ne]: toUpdate.id }
                }}) : null;

                if (!!descIncomes) {
                    return res.status(400).json({ "message": "Descrição duplicada, impossível atualizar!"});
                } else {
                    try {

                        const dateIncomes = (typeof toUpdate.description !== 'undefined' && typeof toUpdate.description !== 'null') ? await database.Incomes.findAll(
                            { where:
                                { date:         { [Op.gte]: Sequelize.fn('DATE', newParams.date, 'start of month'),
                                                  [Op.lte]: Sequelize.fn('DATE', newParams.date, 'start of month', '+1 month', '-1 day') },
                                description:      toUpdate.description,
                                id: { [Op.ne]: toUpdate.id }
                                }
                            }) : [];

                        if (dateIncomes.length > 0) {
                            return res.status(400).json({ "message": "Descrição duplicada ou vazia, impossível atualizar!"});
                        } else {
                            try {
                                await database.Incomes.update(newParams, { where: { id: id } });
                                const incomeUpdated = await database.Incomes.findOne({ where: { id: id } });

                                return res.status(200).json(incomeUpdated);
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
    static async deleteIncome(req, res) {
        const { id } = req.params;
        try {
            await database.Incomes.destroy({ where: { id: id } });
            return res.status(200).json({ "message": `Receita de ID ${id} excluída!` });
        } catch (error) {
            return res.status(500).json(error.message);
    }}

}

module.exports = IncomeController;