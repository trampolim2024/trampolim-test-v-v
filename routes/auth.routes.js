import express from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

// Rota para criar um novo usuário (registro)
router.post('/sign-up', signUp);

// Rota para login de um usuário
router.post('/sign-in', signIn);

// Rota para logout de um usuário (caso deseje implementar o logout)
router.post('/sign-out', signOut);

export default router;
