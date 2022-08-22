import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Table } from "../../../pages/Dashboard/Dashboard.styles";
import {
  FlexForm,
  FormGroup,
  Input,
  Label,
  Submit,
} from "../../../pages/ElectionDetails/ElectionDetails.styles";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";

const ElectionCandidates = ({
  candidates,
  setCandidates,
  setElection
}) => {
  const params = useParams()
  const axiosPrivate = useAxiosPrivate()
  const [candidate, setCandidate] = useState({});
    const [deletedId, setDeletedId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

  const handelCandidateChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addCandidate = async (e) => {
    e.preventDefault();

    const fromData = new FormData();
    fromData.append("name", candidate.name);
    fromData.append("info", candidate.info);
    fromData.append("image", candidate.image);

    try {
      const { data } = await axiosPrivate.post(
        `election/${params.id}/candidate`,
        fromData
      );
      console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }

    setCandidates((prev) => [...prev, candidate]);
    setElection((prev) => {
      return { ...prev, candidates };
    });
  };

   const openModal = () => setIsOpen(true);
   const closeModal = () => setIsOpen(false);

   const confirmDelete = (id) => {
     setDeletedId(id);
     openModal();
   };
  
  const handelDelete = async () => {
    try {
      await axiosPrivate.delete(`/election/${params.id}/candidate/${deletedId}`);
      closeModal();
      const data = candidates.filter(candidate => candidate._id !== deletedId)
      setCandidates(data)
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
      <FlexForm onSubmit={addCandidate} encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="name">Name :</Label>
          <Input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Name"
            value={candidate.name}
            onChange={handelCandidateChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="info">Infos :</Label>
          <Input
            type="text"
            name="info"
            id="info"
            required
            placeholder="Candidate details"
            value={candidate.info}
            onChange={handelCandidateChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image :</Label>
          <Input
            required
            type="file"
            name="image"
            accept=".jpg"
            onChange={(e) =>
              setCandidate((prev) => {
                return { ...prev, image: e.target.files[0] };
              })
            }
          />
        </FormGroup>
        <Submit type="submit" value="Add candidate" />
      </FlexForm>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Infos</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${candidate.image}`}
                  alt=""
                  style={{
                    width: "50px",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{candidate.info}</td>
              <td>
                <FaTrash
                  onClick={(e) => confirmDelete(candidate._id)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* {candidates.map((candidate, index) => (
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/uploads/${candidate.image}`}
              />
              <Card.Body>
                <Card.Title>{candidate.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))} */}
    </>
  );
};

export default ElectionCandidates;
