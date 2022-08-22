import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Option,
  Select,
} from "../../../Global.styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Submit } from "../../../pages/Login/Login.styles";
import { Title } from "../../Add/Add.styles";

const UpdateUser = ({ heading }) => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const { data } = await axiosPrivate.get(`/user/${params.id}`, {
          signal: controller.signal,
        });
        console.log(data.data);
        if (isMounted) {
          setUser(data.data);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.error(err);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const [user, setUser] = useState({});
  const { name, email, role } = user;

  const handelChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosPrivate.put(`user/${params.id}`, user);
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
      <Title>Update {heading}</Title>
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
        <FormGroup>
          <Label htmlFor="role">Role</Label>
          <Select name="role" id="role" value={role} onChange={handelChange}>
            <Option>{role}</Option>
            <Option>{role === "voter" ? "candidate" : "voter"}</Option>
          </Select>
        </FormGroup>
        <Submit type="submit" value="Add" />
      </Form>
    </Container>
  );
};

export default UpdateUser;
