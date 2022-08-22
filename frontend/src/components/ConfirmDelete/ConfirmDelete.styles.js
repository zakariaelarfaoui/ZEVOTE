import styled from "styled-components";

export const StyledConfirmDelete = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
`;

export const ConfirmDeleteHeader = styled.div`
  border-bottom: 1px solid #000;
  padding: 5px;
`;

export const ConfirmDeleteBody = styled.div`
  padding: 1rem 5px;
`;

export const ConfirmDeleteFooter = styled.div`
  padding: 5px;
  border-top: 1px solid #000;
  display: flex;
  justify-content: flex-end;
`;

export const Confirm = styled.button`
  all: unset;
  border: 1px solid red;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
  &:hover {
    background-color: red;
    color: #fff;
  }
`;

export const Cancel = styled.button`
  all: unset;
  background-color: blue;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
`;
