import styled, { createGlobalStyle } from "styled-components";

export const theme = {
  color: {
    bgPrimary: "#101924",
    bgSecondary: "#090f17",
    primaryText: "#8094ae",
    secondaryText: "#816bff",
    border: "#203247",
  },
  mediaquery: {
    mobile: "",
    tablet: "",
    desktop: "",
  },
  sidebarWidth: {
    open: "250px",
    clos: "60px",
  },
};

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body { height: 100vh; }

#root {
  width: 100%;
  height: 100%;
}

.App {
  width: 100%;
  height: 100%;
  font-family: sans-serif;
}

a{
  text-decoration: none;
}

ul{
  list-style: none;
}

`;

export const Container = styled.div`
  width: calc(100% - 250px);
  min-height: calc(100% - 60px);
  padding: 2em;
  background-color: #0d141d;
  position: absolute;
  top: 60px;
  left: 250px;
  color: ${({ theme }) => theme.color.primaryText};
`;

export const Form = styled.form`
  width: 50%;
  min-width: 50%;
  margin: 0 auto;
  padding: 1rem;
`;

export const FormGroup = styled.div`
  padding: 1rem;
`;

export const Select = styled.select`
  all: unset;
  padding: 0.7rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
`;

export const Option = styled.option`
  all: unset;
  padding: 0.7rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  all: unset;
  padding: 0.7rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  all: unset;
  padding: 0.7rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
`;

export const CloseModal = styled.button``;
