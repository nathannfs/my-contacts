const CategoriesReposittory = require('../repositories/CategoriesRepository');

class CategoryController {
  // listar as categorias
  async index(request, response) {
    // para ordenar a lista de categorias
    const { orderBy } = request.query;

    // pega todas as categorias cadastradas
    const categories = await CategoriesReposittory.findAll(orderBy);

    // retorna as categorias
    response.json(categories);
  }

  // Error Handler (Middleware express) -> Manipulador de erros

  // criar nova categoria
  async store(request, response) {
    // pega o nome
    const { name } = request.body;

    // se não passar o nome na hora de criar da esse erro
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // cria a categoria com o nome passado
    const category = await CategoriesReposittory.create({ name });

    // retorna a categoria
    response.json(category);
  }
}

module.exports = new CategoryController();
