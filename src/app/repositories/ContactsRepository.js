// eslint-disable-next-line import/no-extraneous-dependencies
const db = require('../../database');

// classe com funções que dizem o que sua respectiva rota deve fazer
class ContactsRepository {
  // função para mostrar todos os contatos
  async findAll(orderBy = 'ASC') {
    // Refatoração do código comentado embaixo
    // variável para tratar a ordenação dos contatos
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // selecionar todos os contatos do banco de dados
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}
    `);

    // retornar esses contatos
    return rows;

    // return new Promise((resolve) => { resolve(contacts); });
  }

  // função para buscar o contato com o id passado na url
  async findById(id) {
    // Refatoração do código comentado embaixo
    // selecionar o contato que tem o id passado
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1
    `, [id]);

    // retornar esse contato
    return row;

    // return new Promise((resolve) => {
    //   resolve(contacts.find((contact) => contact.id === id));
    // });
  }

  // função para buscar o contato com o email passado na url
  async findByEmail(email) {
    // Refatoração do código comentado embaixo
    // selecionar o contato que tem o email passado
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);

    // retornar esse contato
    return row;

    // return new Promise((resolve) => {
    //   resolve(contacts.find((contact) => contact.email === email));
    // });
  }

  // função para adicionar contatos
  async create({
    name, email, phone, category_id,
  }) {
    // Refatoração do código comentado embaixo
    // inserir novas linhas no banco de dados
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    // retorna o novo contato
    return row;

    // return new Promise((resolve) => {
    //   // novo contato com as informações
    //   const newContact = {
    //     id: v4(),
    //     name,
    //     email,
    //     phone,
    //     category_id,
    //   };
    //   // injetar este contato no banco de dados
    //   contacts.push(newContact);
    //   resolve(newContact);
    // });
  }

  // função para editar contatos
  async update(id, {
    name, email, phone, category_id,
  }) {
    // Refatoração do código comentado embaixo
    // aplica destruturiação para pegar a primeira posição, não retornando como array
    // edita o contato com as informações recebidas
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;

    // return new Promise((resolve) => {
    //   // editar contato com as informações recebidas
    //   const updatedContact = {
    //     id,
    //     name,
    //     email,
    //     phone,
    //     category_id,
    //   };

    //   // atualizar os dados do contato se for igual o id passado
    //   contacts = contacts.map((contact) => (
    //     contact.id === id ? updatedContact : contact
    //   ));

    //   resolve(updatedContact);
    // });
  }

  // função para deletar o contato que contém o id passado na url
  async delete(id) {
    // Refatoração do código comentado embaixo
    // deletar usuário que tem o id passado
    const deleteOp = await db.query(`
    DELETE FROM contacts WHERE id = $1`, [id]);

    return deleteOp;

    // return new Promise((resolve) => {
    //   // vai manter somente os contatos com o id diferente do passado na url
    //   contacts = contacts.filter((contact) => contact.id !== id);
    //   resolve();
    // });
  }
}

module.exports = new ContactsRepository();
