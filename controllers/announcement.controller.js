import Announcement from '../models/announcement.model.js';

// Função para criar um novo anúncio (com upload de arquivo)
export const createAnnouncement = async (req, res, next) => {
  try {
    const { dataInicioSubmissoes, dataFimSubmissoes, inicioAvaliacoes, fimAvaliacoes } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'O arquivo do edital é obrigatório e deve ser um PDF!' });
    }

    const novoEdital = new Announcement({
      dataInicioSubmissoes,
      dataFimSubmissoes,
      inicioAvaliacoes,
      fimAvaliacoes,
      arquivoEdital: req.file.path,
    });

    await novoEdital.save();
    res.status(201).json({ message: 'Edital criado com sucesso!', edital: novoEdital });
  } catch (error) {
    next(error);
  }
};

// Função para pegar todos os anúncios
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({ success: true, data: announcements });
  } catch (e) {
    next(e);
  }
};

// Função para pegar um anúncio pelo ID
export const getAnnouncementById = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Edital não encontrado' });
    }
    res.status(200).json({ success: true, data: announcement });
  } catch (e) {
    next(e);
  }
};

// Função para atualizar um anúncio
export const updateAnnouncement = async (req, res, next) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnnouncement) {
      return res.status(404).json({ success: false, message: 'Edital não encontrado' });
    }
    res.status(200).json({ success: true, message: 'Edital atualizado com sucesso!', data: updatedAnnouncement });
  } catch (e) {
    next(e);
  }
};

// Função para deletar um anúncio
export const deleteAnnouncement = async (req, res, next) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ success: false, message: 'Edital não encontrado' });
    }
    res.status(200).json({ success: true, message: 'Edital excluído com sucesso!' });
  } catch (e) {
    next(e);
  }
};
