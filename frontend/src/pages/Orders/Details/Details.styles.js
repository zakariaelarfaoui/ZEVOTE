import styled from "styled-components";

export const StyledDetails = styled.section`
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
  top: 60px;
  padding: 2em;
  background-color: #0d141d;
  color: ${({ theme }) => theme.color.primaryText};
  transition: left ease-in-out 500ms, width ease-in-out 500ms;
`;

export const Title = styled.h2`
  color: #fff;
  margin-bottom: 2rem;
`;

export const Wrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const Info = styled.article`
  /* flex: 1; */
  /* width: 100%; */
`;
