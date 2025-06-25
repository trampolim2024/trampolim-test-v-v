import request from 'supertest';
import app from '../app';

describe('POST /api/v1/auth/sign-in - Falha', () => {
  it('deve retornar erro de "Senha inválida" para credenciais incorretas', async () => {
    const credentials = {
      email: 'empreendedor@teste.com',
      senha: 'Senha-errada'
    };

    const response = await request(app)
      .post('/api/v1/auth/sign-in')
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Senha inválida'); //
  });
});
