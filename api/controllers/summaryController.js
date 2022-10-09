const database = require('../db/models/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class SummaryController {

    // SUMMARY
    static async summaryByMonth(req, res) {
        console.log('Rodando query summaryByMonth');
        const date = req.params.year + '-' + req.params.month + '-' + '01';


        const sumIncomes = await database.Incomes.sum('value',
            { where:
                { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                          [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') }
                }
            });

        const sumExpenses = await database.Expenses.sum('value',
            { where:
                { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                            [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') }
                }
            });

        const summary = sumIncomes - sumExpenses;

        const sumCatAl = await database.Expenses.sum('value',
            { where:
                { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                            [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
                category: 'Alimentação'
                }
            });
        

        const sumCatSa = await database.Expenses.sum('value',
        { where:
            { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                        [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
            category: 'Saúde'
            }
        });
        
        const sumCatMo = await database.Expenses.sum('value',
        { where:
            { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                        [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
            category: 'Moradia'
            }
        });
 
        const sumCatTr = await database.Expenses.sum('value',
        { where:
            { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                        [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
            category: 'Transporte'
            }
        });
        
        const sumCatEd = await database.Expenses.sum('value',
        { where:
            { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                        [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
            category: 'Educação'
            }
        });

        const sumCatLa = await database.Expenses.sum('value',
        { where:
            { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                        [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
            category: 'Lazer'
            }
        });

        const sumCatIm = await database.Expenses.sum('value',
        { where:
            { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                        [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
            category: 'Imprevistos'
            }
        });

        const sumCatOu = await database.Expenses.sum('value',
        { where:
            { date: { [Op.gte]: Sequelize.fn('DATE', date, 'start of month'),
                        [Op.lte]: Sequelize.fn('DATE', date, 'start of month', '+1 month', '-1 day') },
            category: 'Outros'
            }
        });

        return res.status(200).json(

            {
                "Resumo do mês": date,
                "Resumo das receitas do período": sumIncomes,
                "Resumo das despesas do período": sumExpenses,
                "Saldo do período": summary,
                "Despesas por categoria, Alimentação": sumCatAl,
                "Despesas por categoria, Saúde": sumCatSa,
                "Despesas por categoria, Moradia": sumCatMo,
                "Despesas por categoria, Transporte": sumCatTr,
                "Despesas por categoria, Educação": sumCatEd,
                "Despesas por categoria, Lazer": sumCatLa,
                "Despesas por categoria, Imprevistos": sumCatIm,
                "Despesas por categoria, Outros": sumCatOu
            });
    }
}

module.exports = SummaryController;