import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "../Dashboard/Dashboard.styles";

import {
  Form,
  FormGroup,
  Header,
  Input,
  Label,
  Select,
  Submit,
  Title,
} from "../ElectionDetails/ElectionDetails.styles";
function AddElection() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [election, setElection] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [image, setImage] = useState();
  const [voter, setVoter] = useState([]);
  const [candidate, setCandidate] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState();
  const { title, description, startDate, endDate, status } = election;

  const handelChange = (e) => {
    setElection({ ...election, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosPrivate.post("election", election);
      console.log(data);
      navigate(-1);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <Container>
      <Header>
        <BackButton />
        <Title> Add new election</Title>
      </Header>
      <Form onSubmit={handelSubmit}>
        <FormGroup width={"100%"}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handelChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handelChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Start date"
            value={startDate}
            onChange={handelChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            placeholder="End date"
            value={endDate}
            onChange={handelChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            id="status"
            value={status}
            onChange={handelChange}
          >
            <option value="open">Open</option>
            <option value="pending">Pending</option>
          </Select>
        </FormGroup>
        <Submit type="submit" value="Add" />
      </Form>
    </Container>
  );
}

export default AddElection;
