import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import {
  Container,
  Input,
  Redirect,
  Submit,
  Title,
  Wrapper,
} from "../../styles/auth/auth.styles";
import "./style.css";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const { email, password } = user;

  const handelChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", user, {
        withCredentials: true,
      });
      const { accessToken } = data;
      const payload = jwt_decode(accessToken);
      const { _id, email, name, role } = payload;
      console.log(payload, "pa");
      const from = location.state?.from?.pathname
        ? location.state?.from?.pathname
        : role === "manager"
        ? "/dashboard"
        : "/";

      setAuth({ _id, email, name, role, accessToken });
      console.log(_id, "id");
      navigate(from, { replace: true });
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
        <Title>Login</Title>
        <form onSubmit={handelSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="E-Mail Address"
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
          <Submit type="submit" value="Login" />
          <Redirect to={"/register"}> Don't have an account?</Redirect>
        </form>
      </Container>
    </Wrapper>
  );
}

export default Login;
