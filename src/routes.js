const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

// criando rotas - nos parênteses passa o endpoint e função
// rota para mostrar todos os contatos
router.get('/contacts', ContactController.index);

// rota para listar o contato do id requisitado
router.get('/contacts/:id', ContactController.show);

// rota para deletar o contato do id passado
router.delete('/contacts/:id', ContactController.delete);

// rota para criar um contato
router.post('/contacts', ContactController.store);

// rota para editar um contato com o id passado
router.put('/contacts/:id', ContactController.update);

// rota para mostrar todas as categorias
router.get('/categories', CategoryController.index);

// rota para criar uma categoria
router.post('/categories', CategoryController.store);

module.exports = router;
