import request from 'supertest';
import app from '../app';
import path from 'path';

describe('POST /api/v1/announcements', () => {
  // Limpa os editais antes de cada teste para garantir a condição inicial
  beforeEach(async () => {
    await Announcement.deleteMany({});
  });

  it('deve criar um novo edital com um arquivo PDF', async () => {
    const editalData = {
      dataInicioSubmissoes: '2025-07-01',
      dataFimSubmissoes: '2025-08-01',
      inicioAvaliacoes: '2025-08-02',
      fimAvaliacoes: '2025-09-01',
    };

    const response = await request(app)
      .post('/api/v1/announcements')
      .field('dataInicioSubmissoes', editalData.dataInicioSubmissoes)
      // ...outros campos
      .attach('arquivoEdital', path.resolve(__dirname, 'files/edital.pdf')); // Anexa um PDF de teste

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Edital criado com sucesso!'); //
  });

  it('deve retornar erro ao tentar criar edital com arquivo não-PDF (adm-03)', async () => {
    const response = await request(app)
      .post('/api/v1/announcements')
      .field('dataInicioSubmissoes', '2025-10-01')
      // ...outros campos
      .attach('arquivoEdital', path.resolve(__dirname, 'files/documento.txt')); // Anexa um arquivo .txt

    // A validação do multer na rota deve impedir o upload
    expect(response.status).toBe(400); 
    expect(response.body.error).toContain('Apenas arquivos PDF são permitidos!'); //
  });
});