import Project from '../models/project.model.js';

export const createProject = async (req, res, next) => {
  try {
    const { userId, ...projectData } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'ID do usuário não fornecido' });
    }

    const project = await Project.create({ ...projectData, userId });

    res.status(201).json({ success: true, data: project });
  } catch (e) {
    console.error('Erro ao criar projeto:', e); 
    next(e);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, data: projects });
  } catch (e) {
    next(e);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Projeto não encontrado' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (e) {
    next(e);
  }
};

export const getProjectsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const projects = await Project.find({ userId: userId }); 
    if (!projects || projects.length === 0) {
      return res.status(404).json({ success: false, message: 'Nenhum projeto encontrado para este usuário' });
    }
    res.status(200).json({ success: true, data: projects });
  } catch (e) {
    next(e);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Projeto não encontrado' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (e) {
    next(e);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Projeto não encontrado' });
    }
    res.status(200).json({ success: true, message: 'Projeto removido com sucesso' });
  } catch (e) {
    next(e);
  }
};
