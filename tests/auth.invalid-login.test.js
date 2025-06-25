import request from 'supertest';
import app from '../app';

describe('POST /api/v1/auth/sign-in - Login com senha inválida (auth-03)', () => {
  it('deve retornar erro ao tentar logar com senha incorreta', async () => {
    const credentials = {
      email: 'empreendedor@teste.com',
      senha: 'Senha-errada'
    };

    const response = await request(app)
      .post('/api/v1/auth/sign-in')
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/credenciais inválidas/i);
  });
});
