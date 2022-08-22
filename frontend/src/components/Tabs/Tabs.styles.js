import styled from "styled-components";

export const StyledTabs = styled.ul`
  border-bottom: 1px solid #000;
  list-style: none;
  padding: 0;
`;

export const TabsItem = styled.li`
  background-color: transparent;
  display: inline-block;
  cursor: pointer;

  padding: 10px;
  &:hover {
    border-width: 1px;
    border-style: solid;
    border-color: #000 #000 #fff;
    border-radius: 5px 5px 0 0;
    z-index: 99;
  }&:focus {
    border-width: 1px;
    border-style: solid;
    border-color: #000 #000 #fff;
    border-radius: 5px 5px 0 0;
    z-index: 99;
    }
`;
