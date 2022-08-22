import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  text-align: center;
  align-self: center;
  margin: 0;
`;

export const Form = styled.form`
  display: ${({ flex }) => (flex ? flex : "block")};
  width: 100%;
`;

export const FlexForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  width: ${({ width }) => (width ? width : "33%")};
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  width: 100%;
  background-color: #ccc;
  padding: 5px 1rem;
  border-radius: 5px 5px 0 0;
`;

export const Input = styled.input`
  margin: 5px;
  width: 97%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Submit = styled.input`
  all: unset;
  background-color: green;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

export const Delete = styled.button`
  all: unset;
  background-color: red;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

export const CandidatesList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  margin: 5px;
  width: 97%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
