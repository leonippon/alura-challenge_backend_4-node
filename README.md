## Alura Challenges | Back End 4ª Edição | API REST de Controle Financeiro em Node.JS
[ENGLISH VERSION](https://github.com/leonippon/alura-challenge_backend_4-node/edit/main/README.en.md)
### História

> Após alguns testes com protótipos feitos pelo time de UX de uma empresa, foi requisitada a primeira versão de uma aplicação para controle de orçamento familiar. A aplicação deve permitir que uma pessoa cadastre suas receitas e despesas do mês, bem como gerar um relatório mensal. Os times de frontend e UI já estão trabalhando no layout e nas telas.
> Para o back-end, as principais funcionalidades a serem implementadas são:
> - API com rotas implementadas seguindo as boas práticas do modelo REST;
> - Validações feitas conforme as regras de negócio;
> - Implementação de base de dados para persistência das informações;
> - Serviço de autenticação/autorização para restringir acesso às informações.

### Tecnologias Usadas
- LANG: **Javascript** <div><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"></div>
- RT: **Node.JS**
- FW: **Express.JS**
- DB: **Sqlite**
- ORM: **Sequelize**
- AUTH: **Bcrypt, Jsonwebtoken**
- TEST: **JEST, supertest**
- OTHER: **dotenv, nodemon, sequelize-cli**

### ENDPOINTs:
> - Incomes (Receitas)
>   - /incomes (GET/POST/PUT/DELETE)
>   - /incomes/year (GET)
>   - /incomes/year/month (GET)
> - Expenses (Despesas)
>   - /expenses (GET/POST/PUT/DELETE)
>   - /expenses/year (GET)
>   - /expenses/year/month (GET)
> - Summary (Resumo)
>   - /summary/year/month (GET)
> - User (Usuário)
>   - /signUp (POST)
>   - /signIn (GET)
>   - /updateUser (PUT)
>   - /deleteUser (DELETE)

### Regras de Negócio - Incomes (Receitas)
Exemplo de Receita:
```
{
  id: (UUID)
  description: "Compra na loja X" (STRING)
  value: 1000,00 (DECIMAL)
  date: "2022-01-01" (DATEONLY)
}
```
> - Todas as informações da receita são obrigatórias.
> - A API não deve permitir o cadastro de receitas duplicadas(contendo a mesma descrição, dentro do mesmo mês).
> - Listagem (GET):
>   - Os dados das receitas (descrição, valor e data) devem ser devolvidos no corpo da resposta, no formato JSON.
>   - (/incomes) Retorna todas receitas cadastrada.
>   - (/incomes/:id) Retorna a receita cujo id é {ìd}.
>   - (/incomes?desc=polenta) Retorna as receitas cuja descrição contém {polenta}.
>   - (/incomes/:year) Retorna todas receitas cadastradas no ano {year}.
>   - (/incomes/:year/:month) Retorna todas receitas cadastradas no mês {month} do ano {year}.
> - Cadastro (POST):
>   - (/incomes) Cadastra uma receita dentro das regras, aceita os campos (description, value, date), ignora o restante.
> - Atualização (UPDATE):
>   - Deve verificar as mesmas regras de um novo cadastro antes de aceitar os novos dados, aceita os campos (description, value, date), ignora o resto.
> - Exclusão (DELETE):
>   - (/incomes/:id) Exclui a receita cujo id é {id

### Regras de Negócio - Expenses (Despesas)
Exemplo de Despesa:
```
{
  id: (UUID)
  description: "Compra na loja X" (STRING)
  category: "Outros" (STRING)
  value: 1000 (DECIMAL)
  date: "2022-01-01" (DATEONLY)
}
```
> - Todas as regras das Despesas são válidas aqui.
> - Ao cadastrar uma depesa, a informação da categoria é opcional.
> - Se a categoria da despesa não for informada, a API deve atribuir automaticamente a categoria "Outros" à despesa.
> - Categorias válidas para Despesas:
>   - Alimentação, Saúde, Moradia, Transporte, Educação, Lazer, Imprevistos, Outras.
### Regras de Negócio - Summary (Resumo)
Exemplo de Resumo:
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
> - (/summary/:year/:month) Retorna o resumo acima com os valores somados referentes ao mês {month} do ano {year}.

### Regras de Negócio - Users (Usuários)
Exemplo de Usuário:
```
{
  id: (UUID)
  username: leonardo
  password: hash
}
```
> - Cadastro (POST):
>   - (/signUp) Cadastra no banco o usuário.
> - Entrada (GET):
>   - (/signIn) Retorna o token para o usuário {username} para acesso aos endpoints.
> - Atualização (PUT):
>   - (/updateUser) Troca a senha {new_password} do usuário {username}.
> - Exclusão (DELETE):
>   - (/deleteUser) Exclui o usuário {username}.

### Testes Automatizados
```
// Rodas os testes na ordem:
jest --runInBand incomes.spec.js, expenses.spec.js, summary-users.spec.js
// OU
npm run test incomes.spec.js, expenses.spec.js, summary-users.spec.js
```
> - Há um teste programado para cada função e regra de negócio criada.
> - Nos arquivos _specs_ há detalhamento de cada teste.
> - Alguns testes podem falhar se o framework rodá-los numa ordem indesejada, é necessária refatoração paga garantir que eles rodem independentemente.
