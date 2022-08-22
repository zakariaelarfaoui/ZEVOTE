import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Table } from "../../../pages/Dashboard/Dashboard.styles";
import {
  FlexForm,
  FormGroup,
  Input,
  Label,
  Submit,
} from "../../../pages/ElectionDetails/ElectionDetails.styles";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";

const ElectionVoters = ({ setVoters, setElection, voters }) => {
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [voter, setVoter] = useState([]);
  const [deletedId, setDeletedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handelVoterChange = (e) => {
    const { name, value } = e.target;
    setVoter((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(voter);
  };

  const addVoter = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosPrivate.post(
        `user/election/${params.id}`,
        voter
      );
      console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }

    setVoters((prev) => [...prev, voter]);
    setElection((prev) => {
      return { ...prev, voters };
    });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const confirmDelete = (id) => {
    setDeletedId(id);
    openModal();
  };

  const deleteVoter = async () => {
    try {
      await axiosPrivate.delete(`/user/${deletedId}`);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const removeVoterFromElection = async () => {
    try {
      await axiosPrivate.delete(`/election/${params.id}/voter/${deletedId}`);
      closeModal();
      const data = voters.filter((voter) => voter._id !== deletedId);
      setVoters(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const handelDelete = async () => {
    try {
      // await deleteVoter();
      await removeVoterFromElection();
      closeModal();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <ConfirmDelete
        handelDelete={handelDelete}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <FlexForm encType="multipart/form-data" onSubmit={addVoter}>
        <FormGroup width={"49%"}>
          <Label htmlFor="name">Name: </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={voter.name}
            onChange={handelVoterChange}
          />
        </FormGroup>
        <FormGroup width={"49%"}>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            value={voter.email}
            onChange={handelVoterChange}
          />
        </FormGroup>
        <Submit type="submit" value="Add voter" />
      </FlexForm>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter) => (
            <tr key={voter._id}>
              <td>{voter.name}</td>
              <td>{voter.email} </td>
              <td>
                <FaTrash
                  onClick={(e) => confirmDelete(voter._id)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ElectionVoters;
