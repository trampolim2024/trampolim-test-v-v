import { Router } from 'express';
import { 
  createProject, 
  getAllProjects, 
  getProjectById, 
  updateProject, 
  deleteProject,
  getProjectsByUserId // Importe a nova função
} from '../controllers/project.controller.js';

const projectRoutes = Router();

// Rotas existentes
projectRoutes.get('/', getAllProjects);
projectRoutes.post('/', createProject);
projectRoutes.get('/:id', getProjectById);
projectRoutes.put('/:id', updateProject);
projectRoutes.delete('/:id', deleteProject);
projectRoutes.get('/user/:userId', getProjectsByUserId);

export default projectRoutes;