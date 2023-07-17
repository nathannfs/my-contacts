const ContactsRepository = require('../repositories/ContactsRepository');

// classe para controlar todos os contatos
class ContactController {
  // listar todos os registros
  async index(request, response) {
    // para ordenar a lista de contatos
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    // manda a resposta no formato json com os dados dos contatos
    response.json(contacts);
  }

  // obter um registro
  async show(request, response) {
    // pegar o id passado na url
    const { id } = request.params;

    // verificar se o contato com o id passado está no banco de dados
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // retornar erro se não foi encontrado um usuário com o id informado
      return response.status(404).json({ error: 'User not found!' });
    }

    // retornar o contato daquele id se ele for encontrado
    response.json(contact);
  }

  // criar novo registro
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      // retorna erro se não for passado o nome do contato para registrar
      return response.status(400).json({ error: 'Name is required!' });
    }

    // procurar no banco de dados se tem um contato com esse email já cadastrado
    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      // retorna essa mensagem se o contato com esse email já tiver um cadastro
      return response.status(400).json({ error: 'This e-mail is already in use!' });
    }

    // cria um contato com essas informações passadas
    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    // retorna as informações do novo contato
    response.json(contact);
  }

  // editar um registro
  async update(request, response) {
    // pegar o id passado na url
    const { id } = request.params;

    // pegar as infromações do contato
    const {
      name, email, phone, category_id,
    } = request.body;

    // variável para verificar se o contato com o id passado existe
    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      // retorna erro se não encotrar um usuário com o id passado
      return response.json(404, { error: 'User not found!' });
    }

    if (!name) {
      // retorna erro se não for passado o nome do contato para registrar
      return response.status(400).json({ error: 'Name is required!' });
    }

    // procurar no banco de dados se tem um contato com esse email já cadastrado
    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      // retorna essa mensagem se o contato com esse email e o id dele for diferente
      return response.status(400).json({ error: 'This e-mail is already in use!' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // deletar um registro
  async delete(request, response) {
    // pegar o id passado na url
    const { id } = request.params;

    // deleta o contato com o id passado
    await ContactsRepository.delete(id);

    // só mandar o statuscode sem mensagem no corpo
    // retorna um 204: No Content - sem corpo
    response.sendStatus(204);
  }
}
// Singleton
module.exports = new ContactController();
