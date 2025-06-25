import request from 'supertest';
import app from '../app';
import Announcement from '../models/announcement.model'; // Importa o modelo

describe('POST /api/v1/announcements - Sobreposição de Editais', () => {
  beforeAll(async () => {
    // Garante que um edital ativo exista antes do teste
    await Announcement.create({
      dataInicioSubmissoes: new Date(),
      dataFimSubmissoes: new Date(new Date().setDate(new Date().getDate() + 30)), // Ativo por 30 dias
      inicioAvaliacoes: new Date(new Date().setDate(new Date().getDate() + 31)),
      fimAvaliacoes: new Date(new Date().setDate(new Date().getDate() + 60)),
      arquivoEdital: 'uploads/fake-edital.pdf',
    });
  });

  it('deve retornar erro ao tentar criar um novo edital com um edital já ativo', async () => {
    const response = await request(app)
      .post('/api/v1/announcements')
      .field('dataInicioSubmissoes', new Date())
      // ...outros campos
      .attach('arquivoEdital', path.resolve(__dirname, 'files/outro-edital.pdf'));
      
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Já existe um edital ativo. Não é possível criar um novo até que o atual expire.'); //
  });
});