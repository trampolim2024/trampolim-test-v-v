import request from 'supertest';
import app from '../app';

describe('POST /api/v1/auth/sign-up - Cadastro com e-mail inválido (auth-05)', () => {
  it('deve retornar erro ao tentar cadastrar com email malformado', async () => {
    const invalidUser = {
      email: 'usuariosemarroba.com',
      senha: 'Senha@123',
      tipo: 'empreendedor',
      cpf: '111.222.333-44'
    };

    const response = await request(app)
      .post('/api/v1/auth/sign-up')
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/e-mail inválido/i); 
  });
});
