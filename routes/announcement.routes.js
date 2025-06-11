import { Router } from 'express';
import multer from 'multer';
import { 
  createAnnouncement, 
  getAllAnnouncements, 
  getAnnouncementById, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../controllers/announcement.controller.js';
import { checkIfAnnouncementExists } from '../middlewares/announcement.middleware.js';


const announcementRouter = Router();

// Configuração do multer para upload de PDFs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos PDF são permitidos!'), false);
    }
};

const upload = multer({ storage, fileFilter });

// Rotas
announcementRouter.get('/', getAllAnnouncements);
announcementRouter.get('/:id', getAnnouncementById);
announcementRouter.post('/', checkIfAnnouncementExists, upload.single('arquivoEdital'), createAnnouncement); 
announcementRouter.put('/:id', updateAnnouncement);
announcementRouter.delete('/:id', deleteAnnouncement);

export default announcementRouter;
