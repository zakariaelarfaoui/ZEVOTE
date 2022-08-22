import useGlobalContext from "../../hooks/useGlobalContext";

import AddRestaurant from "./AddRestaurant";
import Modal from "../../components/Modal";

import { Container } from "../../Global.styles";
import { AddButton, Header, Title } from "../Dashboard/Dashboard.styles";
import { BsPlusLg } from "react-icons/bs";
import Table from "../../components/Table/Table";

function RestaurantsList({ title, route }) {
  const { openModal } = useGlobalContext();

  return (
    <section className="dashboard__body">
      <Container>
        <Header>
          <Title>{title}</Title>
          <AddButton onClick={openModal}>
            <BsPlusLg />
          </AddButton>
        </Header>
        <Modal backgroundColor="#141c26">
          <AddRestaurant />
        </Modal>
        <Table route={route}/>
      </Container>
    </section>
  );
}

export default RestaurantsList;
