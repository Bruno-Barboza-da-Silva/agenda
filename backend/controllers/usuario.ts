import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import IUser from './inteface/usuarios.interface';
import User from './models/usuarios.models'





// 3. Create a Model for the "usuarios" collection in the "agenda" database.
// const User = model<IUser>('usuarios', userSchema); // 'usuarios' é o nome da coleção

const usuarioController = {
  cadastro: async (request: Request, response: Response) => {
    const requestBody: { nome: string; email: string; senha: string } = request.body;

    if (!requestBody.nome || !requestBody.email || !requestBody.senha) {
      response.status(400).send('Parâmetros incompletos na solicitação');
      return;
    }

    async function FindEmail(requestBody: { email: string }) {
      await connect('mongodb://127.0.0.1:27017/agenda');

      try {
        const usuario = await User.findOne({ email: requestBody.email });
        return usuario;
      } catch (error) {
        console.error('Erro ao procurar o usuário:', error);
        throw error;
      }
    }

    try {
      const EmailExistente = await FindEmail(requestBody);

      if (EmailExistente) {
        // Se o usuário já existe, envie uma resposta informando o usuário
        response.status(400).json({ message: 'E-mail já cadastrado' });
        return;
      }

      const hashedPassword = await hashPassword(requestBody.senha);
      await run(requestBody, hashedPassword);

      // Após a criação bem-sucedida, exibir o alerta
      const alertMessage = 'Usuário cadastrado com sucesso!';
      response.status(200).json({ message: alertMessage });
    } catch (error) {
      console.error(error);
      response.status(500).send('Erro interno do servidor');
    }

    async function hashPassword(password: string) {
      try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
      } catch (error) {
        console.error('Erro ao hash da senha:', error);
        throw error;
      }
    }

    async function run(requestBody: { nome: string; email: string; senha: string }, hashedPassword: string) {
      await connect('mongodb://127.0.0.1:27017/agenda');

      const user = new User({
        nome: requestBody.nome,
        email: requestBody.email,
        senha: hashedPassword,
      });

      await user.save();
    }
  },
};

export default usuarioController;