import { ModalOverlay, StyledModal } from "./Modal.styles";

const Modal = ({ children }) => (
  <ModalOverlay>
    <StyledModal>
      <span
        className="float-end me-2 mt-1"
        role="button"
        // onClick={closeModal}
      >
        {/* <FontAwesomeIcon icon={faXmark} /> */}
      </span>
      {children}
    </StyledModal>
  </ModalOverlay>
);

export default Modal;
