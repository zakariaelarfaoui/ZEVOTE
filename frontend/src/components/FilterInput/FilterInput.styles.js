import styled from "styled-components";

export const StyledFilterInput = styled.select`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  color: ${({ theme }) => theme.color.primaryText};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 5px;
  margin-bottom: 1rem;  
  margin-left: 1rem;
`;
