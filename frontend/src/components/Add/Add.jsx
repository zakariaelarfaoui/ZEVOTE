import { Container } from "../../Global.styles";
import { Title } from "./Add.styles";

const Add = ({ title, children }) => (
  <Container>
    <Title>Add {title}</Title>
    {children}
  </Container>
);

export default Add;
