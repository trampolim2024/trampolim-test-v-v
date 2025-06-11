import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      nomeCompleto,
      grau_escolaridade,
      area_atuacao,
      genero,
      cpf,
      telefone,
      cep,
      estado,
      cidade,
      bairro,
      endereco,
      linkedin,
      instagram,
      facebook,
      miniCurriculo,
      email,
      senha,
      tipo,
      empreendedor,
      avaliador
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('Usuário já existe');
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    let userData = {
      nomeCompleto,
      grau_escolaridade,
      area_atuacao,
      genero,
      cpf,
      telefone,
      cep,
      estado,
      cidade,
      bairro,
      endereco,
      linkedin,
      instagram,
      facebook,
      miniCurriculo,
      email,
      senha: hashedPassword,
      tipo,
    };

    if (tipo === 'empreendedor') {
      userData.empreendedor = empreendedor || {};
    } else if (tipo === 'avaliador') {
      userData.avaliador = avaliador || {};
    }

    const newUser = new User(userData);

    await newUser.save({ session });

    // Gerar token JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      const error = new Error('Senha inválida');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'Usuário logado com sucesso',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Usuário deslogado com sucesso',
    });
  } catch (error) {
    next(error);
  }
};
