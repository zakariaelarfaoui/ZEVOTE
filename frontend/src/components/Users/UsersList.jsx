import Modal from "../Modal";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { BsPlusLg } from "react-icons/bs";
import { Container } from "../../Global.styles";
import {
  AddButton,
  DashboardBody,
  Header,
} from "../../pages/Dashboard/Dashboard.styles";
function UsersList({ title, type }) {
  // const { openModal } = useGlobalContext();
  return (
    <DashboardBody>
      <Container>
        <Header>
          <h3>{title}</h3>
          <AddButton>
            <BsPlusLg />
            Add
          </AddButton>
        </Header>
        {/* <Modal backgroundColor="#141c26">
          <AddUser type={type} />
        </Modal> */}
        <UsersTable type={type} />
      </Container>
    </DashboardBody>
  );
}

export default UsersList;
