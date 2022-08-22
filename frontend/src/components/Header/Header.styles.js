import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  height: 50px;
  background-color: #4f597f;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Navbar = styled.nav`
  width: clamp(600px, 80%, 80%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`

`

export const Details = styled.div`
margin-left: auto;
margin-right: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
`
export const Name = styled.span`
  display: block;
  font-size: 12px;
`;

export const Email = styled.span`
  font-size: 12px;
`;

export const Logout = styled.div``