const req = require('supertest');
const app = require('../app.js');
const mocks = require('../config/expenses.mocks.js');

// RECEITAS (INCOMES)
// Teste 1 - Criar entradas de receitas.
// Teste 2 - Tentar criar entrada duplicada.
// Teste 3 - Tentar criar entrada duplicada, com valor diferente.
// Teste 4 - Tentar criar entrada duplicada, com dia diferente.
// Teste 5 - Tentar criar entrada duplicada, com valor e dia diferentes.
// Teste 6 - Atualizar descrição de uma entrada.
// Teste 7 - Atualizar valor de uma entrada.
// Teste 8 - Atualizar data de uma entrada.
// Teste 9 - Tentar atualizar descrição de uma entrada para valor pré-existente dentro do mês.
// Teste 10 - Tentar atualizar a data para um mês onde já exista a mesma descrição em outra entrada.
// Teste 11 - Lista todas receitas.
// Teste 12 - Lista receita por ID.
// Teste 13 - Lista receitas do ano.
// Teste 14 - Lista receitas por mês.
beforeAll(('get Token', async () => {
    const user = await req(app).post('/signUp').send({ username: "test", password: "123" });

}));

test('Expenses - Test 1, part 1', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).post('/expenses').send(mocks.expense_test1_1).set('token', `${token}`);;

    expect(res.statusCode).toEqual(200);
    expect(res.body.description).toEqual(mocks.expense_test1_1.description);
    expect(res.body.value).toEqual(mocks.expense_test1_1.value);
    expect(res.body.data).toEqual(mocks.expense_test1_1.data);
});

test('Expenses - Test 1, part 2', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).post('/expenses').send(mocks.expense_test1_2).set('token', `${token}`);;

    expect(res.statusCode).toEqual(200);
    expect(res.body.description).toEqual(mocks.expense_test1_2.description);
    expect(res.body.value).toEqual(mocks.expense_test1_2.value);
    expect(res.body.data).toEqual(mocks.expense_test1_2.data);
});

test('Expenses - Test 1, part 3', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).post('/expenses').send(mocks.expense_test1_3).set('token', `${token}`);;

    expect(res.statusCode).toEqual(200);
    expect(res.body.description).toEqual(mocks.expense_test1_3.description);
    expect(res.body.value).toEqual(mocks.expense_test1_3.value);
    expect(res.body.data).toEqual(mocks.expense_test1_3.data);
});

test('Expenses - Test 2', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).post('/expenses').send(mocks.expense_test1_1).set('token', `${token}`);;

    expect(res.statusCode).toEqual(400);
});

test('Expenses - Test 3', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).post('/expenses').send(mocks.expense_test3).set('token', `${token}`);;

    expect(res.statusCode).toEqual(400);
});

test('Expenses - Test 4', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).post('/expenses').send(mocks.expense_test4).set('token', `${token}`);;

    expect(res.statusCode).toEqual(400);
});

test('Expenses - Test 5', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).post('/expenses').send(mocks.expense_test5).set('token', `${token}`);;

    expect(res.statusCode).toEqual(400);
});

test('Expenses - Test 6', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const inc = await req(app).get('/expenses').set('token', `${token}`);;
    const res = await req(app).put(`/expenses/${inc.body[0].id}`).send(mocks.expense_test6).set('token', `${token}`);;

    expect(res.statusCode).toEqual(200);
    expect(res.body.description).toEqual(mocks.expense_test6.description);
});

test('Expenses - Test 7', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const inc = await req(app).get('/expenses').set('token', `${token}`);;
    const res = await req(app).put(`/expenses/${inc.body[0].id}`).send(mocks.expense_test7).set('token', `${token}`);;

    expect(res.statusCode).toEqual(200)
    expect(res.body.value).toEqual(mocks.expense_test7.value);
});

test('Expenses - Test 8', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const inc = await req(app).get('/expenses').set('token', `${token}`);;
    const res = await req(app).put(`/expenses/${inc.body[0].id}`).send(mocks.expense_test8).set('token', `${token}`);;

    expect(res.statusCode).toEqual(200);
    expect(res.body.date).toEqual(mocks.expense_test8.date);
});


test('Expenses - Test 9', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const inc = await req(app).get('/expenses').set('token', `${token}`);;
    const res = await req(app).put(`/expenses/${inc.body[0].id}`).send(mocks.expense_test9).set('token', `${token}`);;
    expect(res.statusCode).toEqual(400);
});

test('Expenses - Test 10', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const inc = await req(app).get('/expenses').set('token', `${token}`);;
    const res = await req(app).put(`/expenses/${inc.body[2].id}`).send(mocks.expense_test10).set('token', `${token}`);;

    expect(res.statusCode).toEqual(400);
});

test('Expenses - Test 11', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const res = await req(app).get('/expenses').set('token', `${token}`);;

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).not.toEqual(0);
});

test('Expenses - Test 12', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const id = await req(app).get('/expenses').set('token', `${token}`);;
    const res = await req(app).get(`/expenses/${id.body[0].id}`).set('token', `${token}`);;

    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(`${id.body[0].id}`);
});

test('Expenses - Test 13', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const year = await req(app).get('/expenses').set('token', `${token}`);;
    const res = await req(app).get(`/expenses/${String(year.body[0].date).slice(0, 4)}`).set('token', `${token}`);;
    
    expect(res.statusCode).toEqual(200);
});

test('Expenses - Test 14', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const month = await req(app).get('/expenses').set('token', `${token}`);
    const res = await req(app).get(`/expenses/${String(month.body[0].date).slice(0, 4)}/${String(month.body[0].date).slice(5, 7)}`).set('token', `${token}`);

    expect(res.statusCode).toEqual(200);
});