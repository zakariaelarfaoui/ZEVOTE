import { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "../../../Global.styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Submit } from "../../../pages/Login/Login.styles";
import { Title } from "../../Add/Add.styles";

function AddUser({ type, heading }) {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState({ role: type });
  const { name, email } = user;

  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosPrivate.post("user", user);
      console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <Container>
      <Title>Add {heading}</Title>
      <Form onSubmit={handelSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="First Name"
            value={name}
            onChange={handelChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handelChange}
          />
        </FormGroup>
        <Submit type="submit" value="Add" />
      </Form>
    </Container>
  );
}

export default AddUser;
