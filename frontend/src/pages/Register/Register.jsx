import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import {
  Container,
  Input,
  Redirect,
  Submit,
  Title,
  Wrapper,
} from "../../styles/auth/auth.styles";

function Register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const { name, email, password } = user;

  const handelChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", user);
      setSuccess(response.data.message);
      setUser({});
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <Wrapper>
      <Container className="register">
        <Title>Register</Title>
        <form onSubmit={handelRegister}>
          <Input
            name="name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={handelChange}
          />
          <Input
            name="email"
            placeholder="E-Mail Address"
            type="email"
            value={email}
            onChange={handelChange}
          />
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handelChange}
          />
          <Submit type="submit" value="Register" />
          <Redirect to="/login">Already have an account?</Redirect>
        </form>
      </Container>
    </Wrapper>
  );
}

export default Register;
