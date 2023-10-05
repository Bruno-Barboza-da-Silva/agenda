import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/', (request: Request, response: Response) => {
  
    const requestBody: string = request.body; // 'requestBody' é uma string
    console.log(requestBody);
  
    const responseBody: string = 'Solicitação POST recebida com sucesso!';
    response.send(responseBody);
});


// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.post('/', (request, response) => {
//     console.log(request.body);
//     response.send('Solicitação POST recebida com sucesso!');
//   });


// app.post('/', (request: express.Request, response: express.Response) => {
//     // Agora 'request' e 'response' têm tipos específicos
  
//     const requestBody: string = request.body; // 'requestBody' é uma string
//     console.log(requestBody);
  
//     const responseBody: string = 'Solicitação POST recebida com sucesso!';
//     response.send(responseBody);
//   });


app.listen(5000, () => {
  console.log("Aplicação rodando na porta 5000");
});



// const cadastroUsuarioRouter = require('./routes/cadastroUsuario.router')
// const usuarioController = {
//     index: async (request, response) => {
//       console.log(request.body.nome)
//       }
//     },

// app.post('/', usuarioController.index)



// // app.use("/cadastro", cadastroUsuarioRouter)
// app.use("/cadastro", cadastroUsuarioRouter)


// ///////////////////////////
// const { Router } = require('express');
// const usuarioController = require('../controller/usuarioController');

// const router = Router();

// router.post('/', usuarioController.index);


// module.exports = router;
// /////////////////////////

// const ClientsModel = require("../models/usuarioModel");
// const sequelize = require("../config/sequelize");
// sequelize.sync();

// const usuarioController = {
//   index: async (request, response) => {
//     await ClientsModel.create({
//       nome: request.body.nome,
//       email: request.body.email,
//       senha: request.body.senha,
//     });
//   },
// };


// module.exports = usuarioController;

// /////////////////////////



// const contactRouter = require('./routes/contactUs.router')


// app.use("/contact-us", contactRouter);


