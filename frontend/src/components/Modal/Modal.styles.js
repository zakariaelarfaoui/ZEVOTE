import styled from "styled-components";

export const StyledModal = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgPrimary};
  border-radius: 20px;
`;

export const ModalOverlay = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.4);
  z-index: 999;
`;
