import Modal from "../Modal/Modal";
import {
  Cancel,
  Confirm,
  ConfirmDeleteBody,
  ConfirmDeleteFooter,
  ConfirmDeleteHeader,
  StyledConfirmDelete,
} from "./ConfirmDelete.styles";

const ConfirmDelete = ({ handelDelete, isOpen, closeModal }) => (
  <>
    {isOpen && (
      <Modal>
        <StyledConfirmDelete>
          <ConfirmDeleteHeader>Confirm Delete</ConfirmDeleteHeader>
          <ConfirmDeleteBody>
            Are you sure you want to delete this
          </ConfirmDeleteBody>
          <ConfirmDeleteFooter>
            <Cancel onClick={closeModal}>No</Cancel>
            <Confirm onClick={handelDelete}>Yes</Confirm>
          </ConfirmDeleteFooter>
        </StyledConfirmDelete>
      </Modal>
    )}
  </>
);

export default ConfirmDelete;
