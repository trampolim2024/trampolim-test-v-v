import express from 'express';
import cors from 'cors'; 
import fs from 'fs';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import announcementRouter from './routes/announcement.routes.js';
import projectRouter from './routes/project.routes.js';
import connectToDataBase from './database/mongodb.js';
import initializeAdmin from './utils/initializeAdmin.js';

const app = express();

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); 

app.use('/uploads', express.static('uploads'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/announcements', announcementRouter);
app.use('/api/v1/projects', projectRouter);

app.get('/', (req, res) => {
  res.send('API Programa Trampolim is running');
});

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);

  try {
    await connectToDataBase(); 
    await initializeAdmin();   
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
});

export default app;