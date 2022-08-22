import { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  TextArea,
} from "../../../Global.styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Submit } from "../../../pages/Login/Login.styles";

const AddElection = ({ heading }) => {
  const axiosPrivate = useAxiosPrivate();
  const [election, setElection] = useState({});
  const { title, description, startDate, endDate } = election;

  const handelChange = (e) => {
    setElection({ ...election, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // return console.log(election)
    try {
      const { data } = await axiosPrivate.post("election", election);
      console.log(data);
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
      <Form onSubmit={handelSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handelChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Description:</Label>
          <TextArea
            name="description"
            id="description"
            cols={30}
            value={description}
            onChange={handelChange}
          ></TextArea>
          {/* <Input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handelChange}
        ></Input> */}
        </FormGroup>
        <FormGroup>
          <Label>Start Date:</Label>
          <Input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={startDate}
            onChange={handelChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>End Date:</Label>
          <Input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={endDate}
            onChange={handelChange}
          ></Input>
        </FormGroup>
        <Submit type="submit" value="Add" />
      </Form>
    </Container>
  );
};

export default AddElection;
