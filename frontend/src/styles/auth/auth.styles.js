import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #2e3740;
  color: #435160;
  font-family: "Open Sans", sans-serif;
`;

export const Container = styled.section`
  width: 350px;
`;

export const Input = styled.input`
  width: 350px;
  padding: 20px 0px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #435160;
  outline: none;
  color: #6d7781;
  font-size: 16px;
`;

export const Submit = styled.input`
  background: #1fce6d;
  border: 0;
  width: 350px;
  height: 40px;
  margin-top: 1rem;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: #16aa56;
  }
`;

export const Redirect = styled(Link)`
  color: #435160;
  text-decoration: none;
  margin-top: 30px;
  display: block;
  font-size: 11px;
  text-align: center;
  font-weight: bold;
  &:hover {
    margin-top: 30px;
    display: block;
    font-size: 11px;
    text-align: center;
    font-weight: bold;
    color: #6d7781;
  }
`;

export const Title = styled.h2`
  color: #6d7781;
  font-family: "Sofia", cursive;
  font-size: 15px;
  font-weight: bold;
  font-size: 3.6em;
  text-align: center;
  margin-bottom: 20px;
`;
