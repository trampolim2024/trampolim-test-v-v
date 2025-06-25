import request from 'supertest';
import app from '../app';
import User from '../models/user.model';

describe('POST /api/v1/auth/sign-up', () => {
  beforeAll(async () => {
    await User.create({ 
      cpf: '12345678901', 
      email: 'existente@teste.com'
    });
  });

  it('deve retornar erro ao tentar cadastrar com CPF duplicado (auth-04)', async () => {
    const newUser = {
      cpf: '12345678901',
      email: 'novo-usuario@teste.com',
    };
    
    const response = await request(app)
      .post('/api/v1/auth/sign-up')
      .send(newUser);

    expect(response.status).toBe(400); 
    expect(response.body.error).toBe('Duplicate field value entered'); 
  });

  it('deve retornar erro de validação para email malformado (auth-05)', async () => {
    const newUser = {
      cpf: '98765432109',
      email: 'email-invalido.com',
    };

    const response = await request(app)
      .post('/api/v1/auth/sign-up')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Digite um email válido');
  });
});
