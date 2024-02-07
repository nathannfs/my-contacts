import { Link } from 'react-router-dom';

import {
  Card,
  Container,
  Header,
  InputSearchContainer,
  ListContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>
      {/* <Modal danger /> */}

      {/* <Loader /> */}

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome ..." />

      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>

        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Nathan Santos</strong>
              <small>instagram</small>
            </div>

            <span>nathan.santos@gmail.com</span>
            <span>(16) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Trash" />
            </button>
          </div>
        </Card>

      </ListContainer>
    </Container>
  );
}

// nativa do javascript
fetch('http://localhost:3001/contacts')
  .then((response) => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('erro', error);
  });

// SOP  -> Same Origin Policy - Política de mesma origem
// CORS -> Cross-Origin Resource Sharing - Compartilhamento de recursos entre origens cruzadas
// Origem: protocolo://dominio:porta

//   Saída: http://localhost:3000
// Destino: http://localhost:3001
