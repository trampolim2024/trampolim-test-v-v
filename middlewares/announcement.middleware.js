import Announcement from '../models/announcement.model.js';

// Middleware para verificar se já existe um edital
export const checkIfAnnouncementExists = async (req, res, next) => {
  try {
    // Verifica se já existe um edital ativo (por exemplo, um que tenha datas válidas de submissão ou avaliação)
    const existingAnnouncement = await Announcement.findOne({
      $or: [
        { dataInicioSubmissoes: { $lte: new Date() }, dataFimSubmissoes: { $gte: new Date() } },
        { inicioAvaliacoes: { $lte: new Date() }, fimAvaliacoes: { $gte: new Date() } }
      ]
    });

    if (existingAnnouncement) {
      return res.status(400).json({ error: 'Já existe um edital ativo. Não é possível criar um novo até que o atual expire.' });
    }

    // Se não existir edital ativo, prossegue para a próxima função
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao verificar existência de edital.' });
  }
};
