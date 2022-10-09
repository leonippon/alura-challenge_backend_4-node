## Alura Challenges | Back End 4th Edition | REST API for Financial Budgeting in Node.JS
[BRAZILIAN PORTUGUESE VERSION](https://github.com/leonippon/alura-challenge_backend_4-node/edit/main/README.md)
### Story

> After a few tests with prototypes made by a UX team of a company, it was requisited the first version of an application for family budgeting.
> This application must allow for a user to register its incomes and expenses for a desired month, as well as generate a montly summary.
> The front-end and UI teams are already working on layout and screens. For the back-end the main functionality to be implemented are:
> - API with routing implemented following the REST model best practices;
> - Validation done after the business rules;
> - Implementation of database for information persistence.
> - Authentication/authorization service for restriction on information access.

### Technologies used
- LANG: **Javascript**
- RT: **Node.JS**
- FW: **Express.JS**
- DB: **Sqlite**
- ORM: **Sequelize**
- AUTH: **Bcrypt, Jsonwebtoken**
- TEST: **JEST, supertest**
- OTHER: **dotenv, nodemon, sequelize-cli**

### ENDPOINTs:
> - Incomes
>   - /incomes (GET/POST/PUT/DELETE)
>   - /incomes/year (GET)
>   - /incomes/year/month (GET)
> - Expenses
>   - /expenses (GET/POST/PUT/DELETE)
>   - /expenses/year (GET)
>   - /expenses/year/month (GET)
> - Summary
>   - /summary/year/month (GET)
> - User
>   - /signUp (POST)
>   - /signIn (GET)
>   - /updateUser (PUT)
>   - /deleteUser (DELETE)

### Business Rules - Incomes
Income example:
```
{
  id: (UUID)
  description: "Compra na loja X" (STRING)
  value: 1000,00 (DECIMAL)
  date: "2022-01-01" (DATEONLY)
}
```
> - All income fields are required.
> - The API must not allow for duplicated entries (same description on the same month).
> - (GET):
>   - Income data (description, value and date) must be sent in the body response, in json format.
>   - (/incomes) Return all entries.
>   - (/incomes/:id) Returns the record which id is {ìd}.
>   - (/incomes?desc=apple) Returns the record which description contains {apples}.
>   - (/incomes/:year) Returns all records which year is {year}.
>   - (/incomes/:year/:month) Returns all records which months is {month} of year {year}.
> - (POST):
>   - (/incomes) Register an income within the rules, accept the fields (description, value, date), ignores anything else.
> - (UPDATE):
>   - Must verify the same rules of a new entry before updating its fields.
> - (DELETE):
>   - (/incomes/:id) Delete the entry which id is {id}

### Business Rules - Expenses
Expense example:
```
{
  id: (UUID)
  description: "Compra na loja X" (STRING)
  category: "Outros" (STRING)
  value: 1000 (DECIMAL)
  date: "2022-01-01" (DATEONLY)
}
```
> - All Income rules are valid here.
> - When registering an expense, category is optional.
> - If category is not informed, the API must assign the "Outros" category to the expense.
> - Valid category fields:
>   - Alimentação, Saúde, Moradia, Transporte, Educação, Lazer, Imprevistos, Outras.

### Business Rules - Summary
Summary example:
```
{
Resumo do mês: 2022-01-01 (DATEONLY)
Resumo das receitas do período: 10000 (DECIMAL)
Resumo das despesas do período: 9000 (DECIMAL)
Saldo do período: 1000 (DECIMAL)
Despesas por categoria, Alimentação": 1000,
Despesas por categoria, Saúde: 1000,
Despesas por categoria, Moradia: 1000,
Despesas por categoria, Transporte: 1000,
Despesas por categoria, Educação: 1000,
Despesas por categoria, Lazer: 1000,
Despesas por categoria, Imprevistos: 1000,
Despesas por categoria, Outros: 3000
}
```
> - (/summary/:year/:month) Returns the summary above with the Incomes and expenses summed, as well as its balance, for the referning month {month} of year {year}.

### Business Rules - Users
Users example:
```
{
  id: (UUID)
  username: leonardo
  password: hash
}
```
> - (POST):
>   - (/signUp) Register a new user.
> - (GET):
>   - (/signIn) Returns the acess token for user {username}, allowing for endpoint access.
> - (PUT):
>   - (/updateUser) Updates the password {new_password} of user {username}.
> - (DELETE):
>   - (/deleteUser) Deles the user {username}.

### Automated Testing
```
// Runs the tests in order:
jest --runInBand incomes.spec.js, expenses.spec.js, summary-users.spec.js
// OR
npm run test incomes.spec.js, expenses.spec.js, summary-users.spec.js
```
> - There are one test for each function or business rule available.
> - In the _specs_ files, there are details of each test.
> - Some tests may fail if the frameworks runs them at an undesired order, refactoring is necessary. (TODO)
