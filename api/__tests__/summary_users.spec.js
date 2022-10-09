const req = require('supertest');
const app = require('../app.js');

// Resumo e Usuários (USERS && SUMMARY)
// Teste 0 - BeforeAll, cria um usuário novo.
// Teste 1 - Altera a senha do usuário.
// Teste 2 - Exclui o usuário.

beforeAll(('get Token', async () => {
    const user = await req(app).post('/signUp').send({ username: "test", password: "123" });

}));

test('Summary - Test 1', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const month = await req(app).get('/incomes').set('token', `${token}`);
    const res = await req(app).get(`/summary/${String(month.body[0].date).slice(0, 4)}/${String(month.body[0].date).slice(5, 7)}`).set('token', `${token}`);

    expect(res.statusCode).toEqual(200);
});

test('Users - Test 1', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "123" });
    const token = login.body.token;

    const update = await req(app).put('/updateUser').send({ username: "test", password: "123", new_password: "1234" }).set('token', `${token}`);
    const res = await req(app).get('/signIn').send({ username: "test", password: "1234"});

    expect(res.statusCode).toEqual(200);
});

test('Users - Test 2', async () => {
    const login = await req(app).get('/signIn').send({ username: "test", password: "1234" });
    const token = login.body.token;

    const res = await req(app).delete('/deleteUser').send({ username: "test", password: "1234" }).set('token', `${token}`);

    expect(res.statusCode).toEqual(200);
});
