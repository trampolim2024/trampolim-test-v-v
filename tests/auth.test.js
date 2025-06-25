import request from 'supertest';
import app from '../app'; // Importa a aplicação Express

describe('POST /api/v1/auth/sign-in', () => {
  it('deve autenticar um empreendedor com credenciais válidas e retornar um token', async () => {
    const credentials = {
      email: 'empreendedor@teste.com',
      senha: 'Senha@123'
    };

    const response = await request(app)
      .post('/api/v1/auth/sign-in')
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token'); // Verifica se o token foi retornado
  });
});