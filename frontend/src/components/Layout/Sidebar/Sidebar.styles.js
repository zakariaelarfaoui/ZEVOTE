import styled from "styled-components";

export const StyledSidebar = styled.aside`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.bgPrimary};
  color: ${({ theme }) => theme.color.primaryText};
  border-right: 1px solid ${({ theme }) => theme.color.border};
  position: fixed;
  top: 0;
  left: 0;
  transition: width ease-in-out 500ms;
  z-index: 2;
`;

export const Header = styled.header`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  line-height: 60px;
  white-space: nowrap;
  overflow: hidden;
`;

export const LinkGroup = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
