import styled from "styled-components";
import { Container } from "../../Global.styles";

export const StyledHome = styled.section`
  width: calc(
    100% -
      (
        ${({ isSidebarOpen, theme }) =>
          isSidebarOpen ? theme.sidebarWidth.open : theme.sidebarWidth.clos}
      )
  );
  height: calc(100% - 60px);
  position: absolute;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? "250px" : "60px")};
  padding: 2em;
  background-color: #0d141d;
  color: ${({ theme }) => theme.color.primaryText};
  transition: left ease-in-out 500ms, width ease-in-out 500ms;
`;

export const HomeContainer = styled(Container)`
  margin-top: 40px;
`;

export const Analytics = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Statistics = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Order = styled.article`
  background-color: ${({ theme }) => theme.color.bgPrimary};
  color: "#fff";
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.125);
`;
