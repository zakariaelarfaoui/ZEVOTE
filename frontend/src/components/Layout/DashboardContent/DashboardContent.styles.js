import styled from "styled-components";

export const StyledContent = styled.section`
  width: 100%;
  padding: 2em;
  background-color: #0d141d;
  position: absolute;
  top: ${({ isSidebarOpen }) => (isSidebarOpen ? "0" : "60px")};
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? "0" : "250px")};
  color: ${({ theme }) => theme.color.primaryText};
`;
