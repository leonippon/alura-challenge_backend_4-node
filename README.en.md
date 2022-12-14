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

### Technologies Used
> - **LANG:** ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
> - **RT:** ![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
> - **FW:** ![Express.JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
> - **DB:** ![SQLITE](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
> - **ORM:** ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
> - **AUTH:** ![BCRYPT](https://img.shields.io/badge/bcrypt-543DE0?style=for-the-badge&logo=bcrypt&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) 
> - **TEST:** ![JEST](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

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
>   - (/incomes/:id) Returns the record which id is {??d}.
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
>   - Alimenta????o, Sa??de, Moradia, Transporte, Educa????o, Lazer, Imprevistos, Outras.

### Business Rules - Summary
Summary example:
```
{
Resumo do m??s: 2022-01-01 (DATEONLY)
Resumo das receitas do per??odo: 10000 (DECIMAL)
Resumo das despesas do per??odo: 9000 (DECIMAL)
Saldo do per??odo: 1000 (DECIMAL)
Despesas por categoria, Alimenta????o": 1000,
Despesas por categoria, Sa??de: 1000,
Despesas por categoria, Moradia: 1000,
Despesas por categoria, Transporte: 1000,
Despesas por categoria, Educa????o: 1000,
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
