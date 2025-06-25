import request from 'supertest';
import app from '../app';

describe('POST /api/v1/projects - Validação de Link', () => {
  it('deve retornar erro ao submeter proposta com link de pitch inválido', async () => {
    const projeto = {
      // ...outros campos obrigatórios
      linkPitch: 'www.meupitch.com', // Formato inválido
      userId: new mongoose.Types.ObjectId(),
    };

    const response = await request(app)
      .post('/api/v1/projects')
      .send(projeto);

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('não é um link válido!'); //
  });
});
